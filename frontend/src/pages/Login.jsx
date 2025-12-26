// src/pages/Login.jsx
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';

export default function Login() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((s) => s.auth);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card">
      <h2>Login</h2>

      <input {...register('email', { required: true })} placeholder="Email" />
      <input
        type="password"
        {...register('password', { required: true })}
        placeholder="Password"
      />

      {error && <p className="error">{error}</p>}

      <button disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
