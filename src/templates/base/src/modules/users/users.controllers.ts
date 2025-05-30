import { Request, Response } from "express";
import handelAsyncReq from "../../utils/handelAsyncReq";
import successResponse from "../../utils/successResponse";
import { HTTPStatusCode } from "../../utils/httpCode";
import { UserRole } from "@prisma/client";
import { UserService } from "./users.services";
import config from "../../config";

/**
 * Handles user login by verifying credentials and setting a refresh token cookie.
 * @param req - Express request object
 * @param res - Express response object
 */
const userLogin = handelAsyncReq(async (req: Request, res: Response) => {
  // Call the login function from UserService with request body
  const result = await UserService.login(req.body);
  // Set the refresh token as an HTTP-only cookie
  res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true
  });
  // Send a success response with the access token
  successResponse(res, {
    message: 'User logged in successfully.',
    data: result.accessToken
  }, HTTPStatusCode.Ok);
});

/**
 * Handles user logout by clearing the refresh token cookie.
 * @param req - Express request object
 * @param res - Express response object
 */
const userLogout = handelAsyncReq(async (req: Request, res: Response) => {
  // Clear the refresh token cookie
  res.clearCookie('refreshToken');
  // Send a success response indicating the user has logged out
  successResponse(res, {
    message: 'User logged out successfully.',
    data: null
  }, HTTPStatusCode.Ok);
});

/**
 * Handles registration of a new admin user.
 * @param req - Express request object
 * @param res - Express response object
 */
const registration = handelAsyncReq(async (req: Request, res: Response) => {
  // Create an admin information object with additional properties
  const adminInfo = {
    ...req.body,
    password: config.DEFAULT_USER_PASS
  };

  // Call the registration function from UserService with admin information
  const result = await UserService.registration(adminInfo);
  // Send a success response with the newly registered admin data
  successResponse(res, {
    message: 'Admin Registration Successful.',
    data: result
  }, HTTPStatusCode.Created);
});

/**
 * Handles the request to reset the user's password.
 * @param req - Express request object containing the user and body.
 * @param res - Express response object to send the response.
 * @returns {Promise<void>} - Sends a success response with the result of the password reset.
 */
const resetUserPassword = handelAsyncReq(async (req: Request, res: Response) => {
  // Call the resetPassword service with user and body data
  const result = await UserService.resetPassword(req.user, req.body);
  successResponse(res, {
    message: 'Password Reset Successful.', // Success message
    data: result // Result data
  }, HTTPStatusCode.Ok); // HTTP status code 200
});

/**
 * Handles the request for forgetting the user's password.
 * @param req - Express request object containing the body.
 * @param res - Express response object to send the response.
 * @returns {Promise<void>} - Sends a success response with the result of the forget password process.
 */
const forgetUserPassword = handelAsyncReq(async (req: Request, res: Response) => {
  // Call the forgetPassword service with email from request body
  const result = await UserService.forgetPassword(req.body.email);
  successResponse(res, {
    message: 'Check your email. You have only 5 minutes for reset your password.', // Success message
    data: result // Result data
  }, HTTPStatusCode.Ok); // HTTP status code 200
});

/**
 * Handles the request to set a new password for the user.
 * @param req - Express request object containing the body.
 * @param res - Express response object to send the response.
 */
const setNewUserPassword = handelAsyncReq(async (req: Request, res: Response) => {
  // Call the setNewPassword service with data from request body
  const result = await UserService.setNewPassword(req.body);
  successResponse(res, {
    message: 'Password Reset Successful.', // Success message
    data: result // Result data
  }, HTTPStatusCode.Ok); // HTTP status code 200
});


/**
 * Handles the request to retrieve user profile information.
 * @param req - Express request object
 * @param res - Express response object
 */
const userProfile = handelAsyncReq(async (req: Request, res: Response) => {
  // Extract the user's email from the request object
  const userEmail = req.user.email;

  // Retrieve the user's profile information using the UserService
  const result = await UserService.profile(userEmail);

  // Send a success response with the retrieved profile information
  successResponse(res, {
    message: 'Profile info found successfully.',
    data: result,
  }, HTTPStatusCode.Ok);
});

/**
 * Handles the request to update a user's active status in the database.
 * @param req - Express request object
 * @param res - Express response object
 */
const userActiveStatusUpdate = handelAsyncReq(async (req: Request, res: Response) => {
  // Extract the userId from the request parameters
  const userId = req.params.userId;

  // Extract the isActive status from the request body
  const userData = req.body.isActive;

  // Update the user's active status using the UserService
  const result = await UserService.activeStatusUpdate(userId, userData);

  // Send a success response with the updated user data
  successResponse(res, {
    message: 'User active status updated successfully.',
    data: result,
  }, HTTPStatusCode.Ok);
});

/**
 * Handles the request to soft delete a user in the database.
 * @param req - Express request object
 * @param res - Express response object
 */
const userSoftDeleted = handelAsyncReq(async (req: Request, res: Response) => {
  // Extract the userId from the request parameters
  const userId = req.params.userId;

  // Extract the isDeleted status from the request body
  const userData = req.body.isDeleted;

  // Soft delete the user using the UserService
  const result = await UserService.softDeleted(userId, userData);

  // Send a success response with the updated user data
  successResponse(res, {
    message: 'User soft deleted successfully.',
    data: result,
  }, HTTPStatusCode.Ok);
});

// Export the UserController object containing the handler functions
export const UserController = {
  userLogin,
  userLogout,
  registration,
  resetUserPassword,
  forgetUserPassword,
  setNewUserPassword,
  userProfile,
  userActiveStatusUpdate,
  userSoftDeleted
};
