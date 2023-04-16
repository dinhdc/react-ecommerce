import React, { useEffect, useState } from 'react';
import {
  IDiscount,
  IDiscountRequest,
  ModalGlobal,
  showAlert,
  useCreateDiscount,
  useGetListDiscount,
  useUpdateDiscount,
} from '../../lib';
import { positions, types, useAlert } from 'react-alert';
import { Button, Table } from 'react-bootstrap';
import { format } from 'date-fns';
import useModal from '../../lib/hooks';
import FormDiscount from './cu-discount.component';

interface Props {}

const DiscountPage: React.FC<Props> = () => {
  const [discounts, setDiscounts] = useState<Array<IDiscount>>([]);
  const [discountUpdate, setDiscountUpdate] = useState<undefined | IDiscount>(
    undefined
  );
  const alert = useAlert();
  const { isOpen, toggle, hide } = useModal();
  const { data: discountList, isSuccess: loadingDiscount } =
    useGetListDiscount();

  const { mutateAsync: updateDiscountFn, isSuccess: updatedDiscount } =
    useUpdateDiscount();

  const { mutateAsync: createDiscount, isSuccess: createdDiscount } =
    useCreateDiscount();

  const setUpdateDiscount = (data: IDiscount) => {
    setDiscountUpdate(data);
    toggle();
  };

  const onConfirm = async (body: IDiscountRequest) => {
    if (discountUpdate) {
      await updateDiscountFn({ id: discountUpdate.id, discount: body });
    } else {
      await createDiscount(body);
    }
    hide();
  };

  useEffect(() => {
    discountList && setDiscounts(discountList);
  }, [discountList]);

  useEffect(() => {
    loadingDiscount &&
      showAlert(alert, 'loaded success', {
        position: positions.BOTTOM_RIGHT,
        type: types.SUCCESS,
      });
    createdDiscount &&
      showAlert(alert, 'create success', {
        position: positions.BOTTOM_RIGHT,
        type: types.SUCCESS,
      });
    updatedDiscount &&
      showAlert(alert, 'update success', {
        position: positions.BOTTOM_RIGHT,
        type: types.SUCCESS,
      });
  }, [createdDiscount, updatedDiscount, loadingDiscount]);

  return (
    <div style={{ paddingTop: '24px' }}>
      <h2>Discount Page</h2>
      <div>
        <button className='primaryBtn' onClick={toggle}>
          Create New Discount
        </button>
      </div>
      {discounts.length ? (
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
            {discounts.map((discount, index) => (
              <tr key={discount.id} style={{ verticalAlign: 'middle' }}>
                <td className='text-center'>{index + 1}</td>
                <td>{discount.name}</td>
                <td>{discount.desc}</td>
                <td className='text-center'>
                  {format(new Date(discount.updatedAt), 'HH:mm:ss dd-MM-yyyy')}
                </td>
                <td className='text-center'>
                  <Button
                    onClick={() => setUpdateDiscount(discount)}
                    variant='warning'
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
          headerText={discountUpdate ? 'Update Discount' : 'New Discount'}
        >
          <FormDiscount
            onCancel={hide}
            onConfirm={onConfirm}
            data={discountUpdate}
          ></FormDiscount>
        </ModalGlobal>
      )}
    </div>
  );
};

export default DiscountPage;
