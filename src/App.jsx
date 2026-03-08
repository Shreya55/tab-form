import TabForm from './tabFormComponents/TabForm'
import MemoizedTabComponent from './tabFormComponents/memoizedTabComponent/MemoizedTabComponent'
import ProgressBar from './progressBarComponents/ProgressBar'
import Pagination from './paginationComponents/Pagination'
import MemoizedPagination from './paginationComponents/memoizedPaginationComponent/MemoizedPagination'
import AutocompleteSearchBar from './autocompleteSearchBar/AutocompleteSearchBar'
import Chips from './chipsInput/chips'
import MemoizedChips from './chipsInput/memoizedChipsComponent/MemoizedChips'
import OtpInput from './otpInput/OtpInput'
import Shimmer from './shimmer/Shimmer'
import Accordion from './accordion/Accordion'
import FileExplorers from './fileExplorer/FileExplorers'
import NestedCheckboxes from './nestedCheckboxes/NestedCheckboxes'
import Todo from './todo/Todo'
import StarRating from './starRating/StarRating'
import PasswordGenerator from './passwordGenerator/PasswordGenerator'
import Stopwatch from './stopwatch/Stopwatch'
import Timer from './timerLoveBabbar/Timer'
import MemoizedProgressBar from './progressBarComponents/memoizedProgressBarComponent/MemoizedProgressBar'
import ProgressBarInput from './progressBarComponents/progressBarWithInput/ProgressBarInput'

function App() {
  const component = import.meta.env.VITE_COMPONENT;
  console.log(component)
  if (component === 'memoized') {
    return <MemoizedProgressBar progress={-70}/>;
  }
  return <Accordion/>;
}

export default App
