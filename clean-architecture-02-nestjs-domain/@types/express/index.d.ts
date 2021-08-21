import express = require('express');
import { IUserDto } from '@application/user/dtos/user.dto';

declare module 'express' {
  interface Request {
    user?: IUserDto;
  }
}
