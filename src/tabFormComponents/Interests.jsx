export default function Interests({data, setFormData, errors}) {
  const { interests } = data;
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      interests: e.target.checked
        ? [...prev.interests, e.target.name]
        : prev.interests.filter((i) => i !== e.target.name)
    }))
  }
  return (
    <div>
      <label><input type="checkbox" checked={interests.includes('coding')} name="coding" onChange={handleChange}/>Coding</label>
      <label><input type="checkbox" checked={interests.includes('music')} name="music" onChange={handleChange}/>Music</label>
      <label><input type="checkbox" checked={interests.includes('reading')} name="reading" onChange={handleChange}/>Reading</label>
      {errors.interests && <span className="error">{errors.interests}</span>}
    </div>
  )
}
