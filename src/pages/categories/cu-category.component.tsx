import React, { useEffect, useState } from 'react';
import {
  ICategory,
  ICategorySingle,
  VALIDATIONS,
  getCategory,
} from '../../lib';
import { AxiosResponse } from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Input, Label } from 'reactstrap';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ConfirmationModal } from '../../lib/components/modal/confirm-modal.component';

interface FormCategoryProps {
  data?: ICategory;
  onConfirm: (body: any) => void;
  onCancel: () => void;
}

interface FormCategoryType {
  id?: number;
  name: string;
  desc: string;
}

const categorySchema = Yup.object({
  name: Yup.string().trim().required(VALIDATIONS.REQUIRED_MESSAGE),
  desc: Yup.string().trim().required(VALIDATIONS.REQUIRED_MESSAGE),
});

const initalizerData: FormCategoryType = {
  id: undefined,
  name: '',
  desc: '',
};

const FormCategory: React.FC<FormCategoryProps> = ({
  data,
  onCancel,
  onConfirm,
}) => {
  const [initialize, setInitialize] =
    useState<FormCategoryType>(initalizerData);

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
    validationSchema: categorySchema,
    initialValues: {
      id: data?.id || undefined,
      name: data?.name || '',
      desc: data?.desc || '',
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
              <Label>Category Name</Label>
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
              <Label>Category Description</Label>
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

export default FormCategory;
