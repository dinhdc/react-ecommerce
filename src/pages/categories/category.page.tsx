import React, { useEffect, useState, useContext } from 'react';
import Table from 'react-bootstrap/Table';
import {
  ICategory,
  ICreateCategory,
  ModalGlobal,
  createCategory,
  getCategories,
  showAlert,
  updateCategoryAPI,
  useUpdateCategory,
} from '../../lib';
import useModal from '../../lib/hooks';
import FormCategory from './cu-category.component';
import { positions, useAlert } from 'react-alert';
import { Button } from '@mui/material';
import { format } from 'date-fns';
import { useCreateCategory, useGetListCategory } from '../../lib';

interface Props {}

const CategoryPage: React.FC<Props> = () => {
  const alert = useAlert();
  const [categories, setCategory] = useState<Array<ICategory>>([]);
  const [categoryUpdate, setCategoryUpdate] = useState<undefined | ICategory>(
    undefined
  );

  const { data: categoryList, isSuccess: loadingCategory } =
    useGetListCategory();

  const { mutateAsync: updateCategoryFn, isSuccess: updatedCategory } =
    useUpdateCategory();

  const { mutateAsync: createCategory, isSuccess: creatingSuccess } =
    useCreateCategory();

  const { isOpen, toggle, hide } = useModal();

  useEffect(() => {
    if (categoryList) {
      setCategory(categoryList);
    }
  }, [categoryList]);

  const custom = () => {
    toggle();
  };

  const updateCategory = (data: ICategory) => {
    setCategoryUpdate(data);
    toggle();
  };

  const onConfirm = async (body: ICreateCategory) => {
    if (categoryUpdate) {
      await updateCategoryFn({ id: categoryUpdate.id, category: body });
    } else {
      await createCategory(body);
    }
    hide();
  };

  useEffect(() => {
    if (loadingCategory) {
      showAlert(alert, 'loaded success', {
        position: positions.BOTTOM_RIGHT,
      });
    }
    if (creatingSuccess) {
      showAlert(alert, 'create success', {
        position: positions.BOTTOM_RIGHT,
      });
    }
    if (updatedCategory) {
      showAlert(alert, 'update success', {
        position: positions.BOTTOM_RIGHT,
      });
    }
  }, [creatingSuccess, updatedCategory, loadingCategory]);

  return (
    <div style={{ paddingTop: '24px' }}>
      <h2>Category Page</h2>
      <div>
        <button className='primaryBtn' onClick={custom}>
          Create New Category
        </button>
      </div>
      {categories.length ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className='text-center'>Index</th>
              <th>Name</th>
              <th>Description</th>
              <th className='text-center'>Last Update</th>
              <th className='text-center'>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category.id}>
                <td className='text-center'>{index + 1}</td>
                <td>{category.name}</td>
                <td>{category.desc}</td>
                <td className='text-center'>
                  {format(new Date(category.modifiedAt), 'HH:mm:ss dd-MM-yyyy')}
                </td>
                <td className='text-center'>
                  <Button
                    onClick={() => updateCategory(category)}
                    color='error'
                  >
                    {' '}
                    update
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <></>
      )}
      {isOpen && (
        <ModalGlobal
          hide={hide}
          isOpen={isOpen}
          headerText={categoryUpdate ? 'Update Category' : 'New Category'}
        >
          <FormCategory
            onCancel={hide}
            onConfirm={onConfirm}
            data={categoryUpdate}
          ></FormCategory>
        </ModalGlobal>
      )}
    </div>
  );
};

export default CategoryPage;
