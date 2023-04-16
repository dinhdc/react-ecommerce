import { useFormik } from 'formik';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { AxiosError, AxiosResponse } from 'axios';
import { Input, Label } from 'reactstrap';
import { ILoginResponse, LOCAL_STORAGE_KEYS, VALIDATIONS, login, storage } from '../../lib';

const loginSchema = Yup.object({
  username: Yup.string().trim().required(VALIDATIONS.REQUIRED_MESSAGE),
  password: Yup.string().trim().required(VALIDATIONS.REQUIRED_MESSAGE),
});

interface Props {}

const LoginPage: React.FC<Props> = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const profile = storage.get(LOCAL_STORAGE_KEYS.PROFILE, true);
  if (profile) {
    navigate('/categories');
  }

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    isSubmitting,
    isValid,
    dirty,
    setSubmitting,
  } = useFormik({
    validationSchema: loginSchema,
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      login(values.username, values.password)
        .then((res: AxiosResponse<ILoginResponse>) => {
          setSubmitting(false);
          storage.save(LOCAL_STORAGE_KEYS.ACCESS, res.data.data.accessToken);
          navigate('/categories');
        })
        .catch((error) => {
          setSubmitting(false);
        });
    },
  });

  return (
    <div className='h-screen flex justify-center items-center bg-login-image bg-contain bg-no-repeat bg-center w-full'>
      <div className='bg-login-form bg-no-repeat bg-center bg-cover mx-auto w-3/6 h-4xl relative'>
        <div className='login__form-container'>
          <div className='mt-10'>
            <form onSubmit={handleSubmit} autoComplete='off'>
              <Label>Tên đăng nhập</Label>
              <Input
                type='text'
                name='username'
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                disabled={isSubmitting}
                autoComplete='off'
                autoFocus
                status={
                  touched.username && errors.username ? 'error' : undefined
                }
              />
              {/* <Field
              status={touched.password && errors.password ? "error" : undefined}
              className={`mb-4`}
            > */}
              <Label>Mật khẩu</Label>
              <div className='relative'>
                <Input
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
              </div>
              <Button
                variant='primary'
                type='submit'
                className='w-full mt-4 lgk-brand-500'
                disabled={!isValid || !dirty}
              >
                ĐĂNG NHẬP
              </Button>
              <div className='flex justify-between mt-4'>
                <span className='text-sm'>
                  Chưa có tài khoản?{' '}
                  <Link
                    to={'https://www.google.com'}
                    target='_blank'
                    rel='noreferrer'
                    className='text-green-500'
                  >
                    Đăng ký
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
