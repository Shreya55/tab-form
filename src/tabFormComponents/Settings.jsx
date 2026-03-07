export default function Settings({data, setFormData}) {
  const { theme } = data;
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      theme: e.target.name
    }))
  }
  return (
    <div>
      <label><input type="radio" checked={theme.includes('light')} name='light' onChange={handleChange}/>Light</label>
      <label><input type="radio" checked={theme.includes('dark')} name='dark' onChange={handleChange}/>Dark</label>
    </div>
  )
}
