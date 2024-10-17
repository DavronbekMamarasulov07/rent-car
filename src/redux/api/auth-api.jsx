import { api } from "./index";

const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation({
      query: (body) => ({
        url: "/auth/sign-up",
        method: "POST",
        body,
      }),
    }),
    signIn: build.mutation({
      query: (body) => ({
        url: "/auth/sign-in",
        method: "POST",
        body,
      }),
    }),
    verificationOtp: build.mutation({
      query: (body) => ({
        url: "/auth/send-otp",
        method: "POST",
        body,
      }),

    }),
    resendOtp: build.mutation({
      query: (email) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body : {email},
      }),
    }),
    
  }),
});

export const { useSignUpMutation, useSignInMutation ,useVerificationOtpMutation, useResendOtpMutation } = userApi;
