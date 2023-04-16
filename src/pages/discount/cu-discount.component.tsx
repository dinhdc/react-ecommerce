import React, { useEffect, useState } from 'react';
import { IDiscount, VALIDATIONS } from '../../lib';
import { AxiosResponse } from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Input, Label } from 'reactstrap';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ConfirmationModal } from '../../lib/components/modal/confirm-modal.component';

interface FormDiscountProps {
  data?: IDiscount;
  onConfirm: (body: any) => void;
  onCancel: () => void;
}

interface FormDiscountType {
  id?: number;
  name: string;
  desc: string;
  percent: number;
  active: boolean;
}

const discountSchema = Yup.object({
  name: Yup.string().trim().required(VALIDATIONS.REQUIRED_MESSAGE),
  desc: Yup.string().trim().required(VALIDATIONS.REQUIRED_MESSAGE),
  percent: Yup.number().required(VALIDATIONS.REQUIRED_MESSAGE),
  active: Yup.boolean().required(VALIDATIONS.REQUIRED_MESSAGE),
});

const FormDiscount: React.FC<FormDiscountProps> = ({
  data,
  onCancel,
  onConfirm,
}) => {
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
    validationSchema: discountSchema,
    initialValues: {
      id: data?.id || undefined,
      name: data?.name || '',
      desc: data?.desc || '',
      percent: data?.percent || 0,
      active: data?.active || false,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <div className='login__form-container'>
        <div className='mt-10'>
          <form onSubmit={handleSubmit} autoComplete='off'>
            <div className='mt-2'>
              <Label>Discount Name</Label>
              <Input
                type='text'
                name='name'
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                disabled={isSubmitting}
                autoComplete='off'
                autoFocus
                status={touched.name && errors.name ? 'error' : undefined}
              />
            </div>

            <div className='mt-2'>
              <Label>Discount Description</Label>
              <div className='relative'>
                <Input
                  name='desc'
                  type='text'
                  value={values.desc}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
              </div>
            </div>

            <div className='mt-2'>
              <Label>Discount Percent</Label>
              <div className='relative'>
                <Input
                  name='percent'
                  type='number'
                  value={values.percent}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
              </div>
            </div>

            <div className='mt-2'>
              <Label>Discount Active</Label>
              <div className='relative'>
                <Input
                  name='active'
                  type='checkbox'
                  defaultChecked={values.active}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className='mt-2'>
        <ConfirmationModal
          confirmText={data && 'Update'}
          onConfirm={() => onConfirm(values)}
          onCancel={onCancel}
        />
      </div>
    </>
  );
};

export default FormDiscount;
