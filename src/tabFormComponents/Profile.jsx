export default function Profile({data, setFormData, errors}) {
  const { name, age, email } = data;

  const handleChange = (e, item) => {
    setFormData((prev) => ({
      ...prev,
      [item]: e.target.value
    }))
  }
  return (
    <div className="profile-form">
      <label>Name: </label>
      <input type="text" name="name" value={name} onChange={(e) => handleChange(e, 'name')}/>
      {errors.name && <span className="error">{errors.name}</span>}
      <label>Age: </label>
      <input type='number' name="number" value={age} onChange={(e) => handleChange(e, 'age')}/>
      {errors.age && <span className="error">{errors.age}</span>}
      <label>Email: </label>
      <input type="email" name='email' value={email} onChange={(e) => handleChange(e, 'email')}/>
      {errors.email && <span className="error">{errors.email}</span>}
    </div>
  )
}
