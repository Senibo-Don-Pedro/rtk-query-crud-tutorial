import { useState } from 'react';
import { useCreateUserMutation } from '../store/index';

const AddUser = () => {
  const [createUser] = useCreateUserMutation();
  const [formData, setFormData] = useState({ firstName: '',lastName: '', email: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData)
    await createUser({...formData, id: String(Math.random())})
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstName" placeholder="firstName" value={formData.firstName} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUser;
