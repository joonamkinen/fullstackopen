import { useField } from '../hooks/index'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const CreateNew = (props) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')
    const navigate = useNavigate()
  
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content : content.value,
        author : author.value,
        info : info.value,
        votes: 0
      })
      navigate('/')
    }
  
    const handleReset = (e) => {
      e.preventDefault()
      content.onReset()
      author.onReset()
      info.onReset()
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content} />
          </div>
          <div>
            author
            <input {...author} />
          </div>
          <div>
            url for more info
            <input {...info} />
          </div>
          <button type="button" onClick={handleReset}>reset</button>
          <button>create</button>
        </form>
      </div>
    )
  
  }
  CreateNew.propTypes = {
    addNew: PropTypes.func.isRequired,
  }
  
  export default CreateNew