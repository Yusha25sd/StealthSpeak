'use client';

import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebounceCallback } from 'usehooks-ts';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import axios, { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signUpSchema } from '@/schemas/signUpSchema';

export default function SignUpForm(){
  const [username,setUsername] = useState('');
  const [usernameMessage,setUsernameMessage] = useState('');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting,setIsSubmitting] = useState(false);
  
  const debounced = useDebounceCallback(setUsername,300);
  const {toast} = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    }
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if(username){
        setIsCheckingUsername(true);
        setUsernameMessage('');
        try {
          const response = await axios.get<ApiResponse>(`/api/check-username-unique?username=${username}`);
          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? "Error checking message"
          )
        } finally {
          setIsCheckingUsername(false);
        }
      }
    }
    checkUsernameUnique();
  },[username])

const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
  setIsSubmitting(true);

  try {
    const response = await axios.post<ApiResponse>('/api/sign-up',data);
    toast({
      title: 'Success',
      description: response.data.message,
    });
    router.replace(`/verify/${username}`);
    setIsSubmitting(false);
  } catch (error) {
    console.error('Error during sign-up:', error);
    const axiosError = error as AxiosError<ApiResponse>;
    let errorMessage = axiosError.response?.data.message;
    toast({
      title: 'Sign Up Failed',
      description : errorMessage,
      variant: 'destructive', 
    });
    setIsSubmitting(false); 
  }
}
  return(
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Stealth Speak
          </h1>
          <p className="mb-4">Sign up to start your anonymous adventure</p>
        </div>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField          
        control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="username">Username</FormLabel>
                <Input id="username" placeholder="Username" 
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  debounced(e.target.value);
                }}
                autoComplete='username'
                />
                {isCheckingUsername && <Loader2 className="animate-spin" />}
                  {!isCheckingUsername && usernameMessage && (
                    <p
                      className={`text-sm ${
                        usernameMessage === 'Username is available'
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      {usernameMessage}
                    </p>
                  )}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" placeholder="Email" 
                {...field}
                autoComplete='email'
                />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor='password'>Password</FormLabel>
                <Input type="password" id="password" placeholder="Password" 
                {...field}
                />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
        {
          isSubmitting? (
            <>
            <Loader2 className="mr-2 h-4 2-4 animate-spin"/>
            Please wait
            </>
          ) : ('Submit')
        }
        </Button>
      </form>
    </Form>
        <div className="text-center mt-4">
          <p>
            Already a member?{' '}
            <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
};








