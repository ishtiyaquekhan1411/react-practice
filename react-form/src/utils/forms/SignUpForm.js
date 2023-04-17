import FormFieldConfig from "./config/FormFieldConfig";
import {
  requiredRule,
  minLengthRule,
  maxLengthRule,
  passwordMatchRule,
  emailFormatRule
} from './config/rules/validationRule';

export const SignUpForm = {
  name: {
    ...FormFieldConfig('Full Name', 'name', 'text'),
    validationRules: [
      requiredRule('name'),
      minLengthRule('name', 3),
      maxLengthRule('name', 25),
    ]
  },
  email: {
    ...FormFieldConfig('Email', 'email', 'email'),
    validationRules: [
      requiredRule('email'),
      maxLengthRule('email', 25),
      emailFormatRule()
    ]
  },
  password: {
    ...FormFieldConfig('Password', 'password', 'password'),
    validationRules: [
      requiredRule('password'),
      minLengthRule('password', 8),
      maxLengthRule('password', 20),
    ],
  },
  confirmPassword: {
    ...FormFieldConfig('Confirm Password', 'confirmPassword', 'password'),
    validationRules: [passwordMatchRule()]
  },
}