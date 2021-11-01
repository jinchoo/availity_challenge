import { useForm } from 'react-hook-form';
import './App.css';

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  console.log(watch('example')); // watch input value by passing the name of it
  console.log(errors);
  return (
    <div className='App'>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input
          {...register('firstName', { required: true })}
          placeholder='First Name'
        />
        {errors.firstName && (
          <span className='errors'>First Name is Required</span>
        )}
        {/* // errors.firstName.type === 'required' */}
        {/* // errors.firstName.type === 'min' */}
        {/* // errors.firstName.type === 'max' */}
        {/* // errors.firstName.type === 'pattern' */}

        {/* // erros.lastName */}

        {/* include validation with required or other standard HTML validation rules */}
        <input
          {...register('lastName', { required: true })}
          placeholder='Last Name'
        />
        {/* errors will return when field validation fails  */}
        {errors.lastName?.type && (
          <span className='errors'>This field is required</span>
        )}

        <input
          type='number'
          min='0'
          {...register('npiNumber', { min: 1, required: true })}
          placeholder='NPI Number'
        />
        {errors.npiNumber?.type === 'min' && (
          <span className='errors'>Minimum number is 1</span>
        )}
        {errors.npiNumber?.type === 'required' && (
          <span className='errors'>NPI Number is Required</span>
        )}

        <input
          {...register('businessAddress', { required: true })}
          placeholder='Business Address'
        />
        {errors.businessAddress?.type === 'required' && (
          <span className='errors'>Business Address is Required</span>
        )}

        <input
          type='number'
          {...register('telephoneNumber', { required: true })}
          placeholder='Telephone Number'
        />
        {errors.telephoneNumber?.type === 'required' && (
          <span className='errors'>Telephone Number is Required</span>
        )}

        <input
          type='email'
          {...register('email', { required: true })}
          placeholder='Email Address'
        />
        {errors.email?.type === 'required' && (
          <span className='errors'>Email Address is Required</span>
        )}

        <input type='submit' />
      </form>
    </div>
  );
}

export default App;
