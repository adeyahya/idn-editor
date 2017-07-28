import update from 'react-addons-update'

const idneditor = (state = [
  { label: 'title', value: 'Node.js Emerging as the Universal Development Framework for a Diversity of Applications', type: 'h1' },
  { label: 'facebook', value: 'https://www.facebook.com/facebook/videos/10153231379946729/', link: '', caption: '' },
  { label: 'content', value: `<p>Last year and at the beginning of this year, we asked you, Node.js users, to help us understand where, how and why you are using Node.js. We wanted to see what technologies you are using alongside Node.js, how you are learning Node.js, what Node.js versions you are using, and how these answers differ across the globe.</p>
<p>Thank you to all who participated.</p>
<p>1,405 people from around the world (85+ countries) completed the survey, which was available in English and Mandarin. 67% of respondents were developers, 28% held managerial titles, and 5% listed their position as “other.” Geographic representation of the survey covered: 35% United States and Canada, 41% EMEA, 19% APAC, and 6% Latin and South America.</p>
<p>There was a lot of incredible data collected revealing:</p>
<ul>
  <li>Users span a broad mix of development focus, ways of using Node.js, and deployment locations.</li>
  <li>There is a large mix of tools and technologies used with Node.js.</li>
  <li>Experience with Node.js is also varied — although many have been using Node.js less than 2 years.</li>
  <li>Node.js is a key part of the survey user’s toolkit, being used at least half of their development time.</li>
</ul>
<p>The report also painted a detailed picture of the types of technologies being used with Node.js, language preferences alongside Node.js, and preferred production and development environments for the technology.</p>
<p>“Given developers’ important role in influencing the direction and pace of technology adoption, surveys of large developer communities are always interesting,” said Rachel Stephens, RedMonk Analyst. “This is particularly true when the community surveyed is strategically important like Node.js.”</p>
<p>In September, we will be releasing the interactive infographic of the results, which will allow you to dive deeper into your areas of interest. For the time being, check out our blog on the report below and download the executive summary.</p>
<blockquote>Node.js is emerging as a universal development framework for digital transformation with a broad diversity of applications.</blockquote>` },
  { label: 'facebook', value:'https://www.facebook.com/facebook/videos/10155278547321729/' }
], action) => {
  switch (action.type) {
    case 'ADD_CONTENT':
      return [
        ...state,
        { label: 'content', value: '' }
      ]
    case 'ADD_SECTION':
      return [
        ...state,
        action.payload
      ]
    case 'ADD_TITLE':
      return [
        ...state,
        { label: 'title', value: '' }
      ]
    case 'ADD_IMAGE':
      return [
        ...state,
        { label: 'image', value: '', link: '', caption: '' }
      ]
    case 'UPDATE_VALUE': {
      return update(state, {
        [action.index]: {
          value: {$set: action.payload}
        }
      })
    }
    case 'REMOVE_SECTION':
      return state.slice(0, action.index).concat(state.slice(action.index + 1))
    default:
      return state
  }
}

export default idneditor