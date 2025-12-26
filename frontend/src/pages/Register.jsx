    // pages/Register.jsx
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { register } from '../features/auth/authSlice';

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

export default function Register() {
  const dispatch = useDispatch();
  const { register: rf, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => dispatch(register(data));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...rf('firstName')} placeholder="First Name" />
      <p>{formState.errors.firstName?.message}</p>

      <input {...rf('lastName')} placeholder="Last Name" />
      <input {...rf('email')} placeholder="Email" />
      <input type="password" {...rf('password')} placeholder="Password" />

      <button type="submit">Register</button>
    </form>
  );
}
