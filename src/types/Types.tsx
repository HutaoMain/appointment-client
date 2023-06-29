export interface LoginInterface {
  email: string;
  password: string;
}

export interface RegistrationInterface {
  fullname: string;
  email: string;
  password: string;
}

export interface UserInterface {
  _id: string;
  fullname: string;
  email: string;
  role: string;
}

export interface AppointmentInterface {
  _id: string;
  appointmentDate: string;
  appointmentTime: string;
  inquiryMessage: string;
  status: string;
  email: string;
  adminNotification: boolean;
  adminMarkAsRead: boolean;
  userNotification: boolean;
  userMarkAsRead: boolean;
}
