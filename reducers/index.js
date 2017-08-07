import update from 'react-addons-update'

const idneditor = (state = {
  data: [
    { type: 'unsplash', value: 'https://images.unsplash.com/photo-1476474580632-1d0b63e845fa?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=dd1f553dd6bbaba956b16bd449526d61' },
    { type: 'title', value: 'Net Neutrality – A Day of Action', style: 'h1' },
    { type: 'content', value: `<p>Today, people and companies across the country are participating in a day of action to fight for net neutrality. Facebook is proud to be a part of it.</p>
<p>Net neutrality means a free and open internet for everyone. It ensures that internet service providers are not allowed to block or throttle internet traffic or discriminate against certain content.</p>
<p>The FCC has existing rules in place to protect net neutrality and ensure that anyone with an internet connection has a fair shot at turning an idea into something that can change the world. That would change if internet providers were allowed to decide what content its customers could access, or charge customers more to access the websites and services of their choice.</p>
<p>The FCC’s current rules help prevent this from happening. We strongly support those rules, but the FCC’s new proposal could undo those protections. That’s why Facebook supports strong net neutrality rules that will keep the internet free and open.</p>
<p>We’re open to working with anyone, including members of Congress, on a solution that will preserve strong net neutrality protections. We hope you join us in this fight. To learn more about the day of action</p>` },
  { type: 'facebook', value: 'https://web.facebook.com/FacebookIndonesia/videos/391132524357127/' },
  { type: 'title', style: 'h2', value: 'One of the best ways for creators' },
  { type: 'content', value: `<p>One of the best ways for creators to reach new audiences and broaden distribution of their videos on Facebook is when people re-share their videos. To make sure we’re meeting the needs of both creators and those who re-share content, we’re redesigning insights for re-shares.</p>
<p>We gathered feedback from creators and re-sharers and tested new metrics. We heard that creators want more information about which Pages are re-sharing their videos. In addition, creators put a lot of work and investment into the videos they create and share on Facebook, and they would prefer if re-sharers didn’t have access to certain metrics about their videos.</p>` },
	{ type: 'youtube', value: 'https://www.youtube.com/embed/6pxIcH_0MH0' },
	{ type: 'content', value: `<p>One of the best ways for creators to reach new audiences and broaden distribution of their videos on Facebook is when people re-share their videos. To make sure we’re meeting the needs of both creators and those who re-share content, we’re redesigning insights for re-shares.</p>
<p>We gathered feedback from creators and re-sharers and tested new metrics. We heard that creators want more information about which Pages are re-sharing their videos. In addition, creators put a lot of work and investment into the videos they create and share on Facebook, and they would prefer if re-sharers didn’t have access to certain metrics about their videos.</p>` },
  { type: 'unsplash', value: '' },
  ]
}, action) => {
  switch (action.type) {
    case 'ADD_SECTION': {
      return Object.assign({}, state, {
        data: state.data.concat(action.payload)
      })
    }
    case 'UPDATE_VALUE': {
      return update(state, {
        data: {
          [action.index]: {
            value: {$set: action.payload}
          }
        }
      })
    }
    case 'REMOVE_SECTION': {
      return Object.assign({}, state, {
        data: state.data.slice(0, action.index).concat(state.data.slice(action.index + 1))
      })
    }
    default: {
      return state
    }
  }
}

export default idneditor
