import { Router } from "express";
import { UserController } from "./users.controllers";
import { authGuard } from "../../middlewares/authGuard";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";

// Create a new Express Router instance
export const UserRoutes = Router();

/**
 * Route to handle user login.
 * @route POST /login
 * @access Public
 * @middleware validateRequest - Middleware to validate the request body against the loginSchema
 * @controller UserController.userLogin - Controller function to handle the login
 */
UserRoutes.post(
  '/login',
  validateRequest(UserValidation.loginSchema),
  UserController.userLogin
);

/**
 * Route to handle user logout.
 * @route POST /logout
 * @access Public
 * @controller UserController.userLogout - Controller function to handle the logout
 */
UserRoutes.post(
  '/logout',
  UserController.userLogout
);

/**
 * Route to handle admin registration.
 * @route POST /registration
 * @access Restricted to ADMIN and SUPER_ADMIN
 * @middleware validateRequest - Middleware to validate the request body against the employeeSchema
 * @middleware authGuard - Middleware to check if the user has ADMIN or SUPER_ADMIN role
 * @controller UserController.adminRegistration - Controller function to handle the admin registration
 */
UserRoutes.post(
  '/registration',
  validateRequest(UserValidation.registrationSchema),
  UserController.registration
);

/**
 * Route to handle resetting the user's password.
 * @route POST /password/reset
 * @access Restricted to ADMIN, SUPER_ADMIN, PROJECT_MANAGER, ENGINEER, CLIENT
 * @middleware validateRequest - Middleware to validate the request body against resetPasswordSchema
 * @middleware authGuard - Middleware to check if the user has one of the specified roles
 * @controller UserController.resetUserPassword - Controller function to reset password
 */
UserRoutes.post(
  '/password/reset',
  validateRequest(UserValidation.resetPasswordSchema),
  authGuard('ADMIN', 'SUPER_ADMIN', 'PROJECT_MANAGER', 'ENGINEER', 'CLIENT'),
  UserController.resetUserPassword
);

/**
 * Route to handle forgetting the user's password.
 * @route POST /password/forget
 * @access Public
 * @middleware validateRequest - Middleware to validate the request body against forgetPasswordSchema.
 * @controller UserController.forgetUserPassword - Controller function for forgetting the user's password.
 */
UserRoutes.post(
  '/password/forget',
  validateRequest(UserValidation.forgetPasswordSchema),
  UserController.forgetUserPassword
);

/**
 * Route to handle setting a new password for the user.
 * @route POST /password/set-new
 * @access Public
 * @middleware validateRequest - Middleware to validate the request body against setNewPasswordSchema.
 * @controller UserController.setNewUserPassword - Controller function to set a new password for the user.
 */
UserRoutes.post(
  '/password/set-new',
  validateRequest(UserValidation.setNewPasswordSchema),
  UserController.setNewUserPassword
);

/**
 * Route to handle retrieving user profile information.
 * @route GET /profile/me
 * @access Restricted to ADMIN, SUPER_ADMIN, PROJECT_MANAGER, ENGINEER, CLIENT
 * @middleware authGuard - Middleware to check if the user has one of the specified roles
 * @controller UserController.userProfile - Controller function to handle retrieving the user profile information
 */
UserRoutes.get(
  '/profile/me',
  authGuard('ADMIN', 'SUPER_ADMIN', 'CLIENT'),
  UserController.userProfile
);

/**
 * Route to update a user's active status.
 * @route PUT /:userId/update/active/status
 * @access Restricted to ADMIN and SUPER_ADMIN
 * @middleware validateRequest - Middleware to validate the request body against the updateActiveSchema
 * @middleware authGuard - Middleware to check if the user has ADMIN or SUPER_ADMIN role
 * @controller UserController.userActiveStatusUpdate - Controller function to handle the update
 */
UserRoutes.patch(
  '/:userId/update/active/status',
  validateRequest(UserValidation.updateActiveSchema),
  authGuard('ADMIN', 'SUPER_ADMIN'),
  UserController.userActiveStatusUpdate
);

/**
 * Route to soft delete a user.
 * @route DELETE /:userId/soft-delete
 * @access Restricted to ADMIN and SUPER_ADMIN
 * @middleware validateRequest - Middleware to validate the request body against the softDeletedSchema
 * @middleware authGuard - Middleware to check if the user has ADMIN or SUPER_ADMIN role
 * @controller UserController.userSoftDeleted - Controller function to handle the soft delete
 */
UserRoutes.delete(
  '/:userId/soft-delete',
  validateRequest(UserValidation.softDeletedSchema),
  authGuard('ADMIN', 'SUPER_ADMIN'),
  UserController.userSoftDeleted
);
