import './Testimonials.styl'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import React from 'react';
import { Image, Icon, Rating } from 'semantic-ui-react'

class Testimonials extends React.Component {
  constructor (props) {
    super(props);
  }

  settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true
  }

  render () {
    return <div className='testimonials'>
      <div>
        <Icon name='quote left' color='grey' size='large' />
        <p className='quote'>
          The quality of the candidates are by far more relevant and experienced than on other boards. They are in the crypto space and have the past experience to hit the ground running.
        </p>
        <p className='quote hide'>At first, I was hesitant. But then decided to <b>feature</b>… And <b>it worked</b>!<br/> The quality of the <b>candidates are by far more relevant</b> then on other boards. And, I mean, I don’t need to explain crypto to them!</p>
        <div className='author'>
          <a href='https://twitter.com/Davie_Michael' target='_blank'>
            <Image centered circular size='tiny' src='https://res.cloudinary.com/cryptojobslist/image/fetch/g_face,c_thumb,w_90,h_90,e_improve,q_auto,fl_lossy,f_auto/dpr_2.0/https://res.cloudinary.com/cryptojobslist/image/upload/v1519053954/w23nhpncdqfcpaxda7il.jpg' />
          </a>
          <p>
            <b><a href='https://twitter.com/Davie_Michael' target='_blank'>Mike Davie</a></b><br/>
            Founder & CEO, <a href="https://cryptojobslist.com/blockchain-companies/datastreamx" target='_blank'>DataStreamX</a>
            <br/>
            <Rating maxRating={5} defaultRating={5} icon='star' size='tiny' disabled/><br/>
          </p>
        </div>
      </div>
      <div>
        <Icon name='quote left' color='grey' size='large' />
        <p className='quote'>
          We <a href='https://cryptojobslist.com/jobs/marketing-social-media-intern-at-adel-96qhddh3h' target='_blank'>posted</a> on <b>Crypto Jobs List</b> looking for <b>marketing</b> help with community engagement, digital marketing and social media and <b>found not one, but two highly qualified candidates</b> within days! We interviewed and hired them within three weeks.
        </p>
        <div className='author'>
          <a href='https://twitter.com/adelphoi_io' target='_blank'>
            <Image centered circular size='tiny' src='https://res.cloudinary.com/cryptojobslist/image/fetch/g_face,c_thumb,w_90,h_90,e_improve,q_auto,fl_lossy,f_auto/dpr_2.0/https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/000/11d/30f/0d0fa01.jpg' />
          </a>
          <p>
            <b><a href='https://twitter.com/adelphoi_io' target='_blank'>Jessica Zartler</a></b><br/>
            Marketing & Communications Director, <a href="https://cryptojobslist.com/blockchain-companies/adel" target='_blank'>Adel</a>
            <br/>
            <Rating maxRating={5} defaultRating={5} icon='star' size='tiny' disabled/><br/>
          </p>
        </div>
      </div>
      <div>
        <Icon name='quote left' color='grey' size='large' />
        <p className='quote'>
          Let me give you my feedback. I think it would be useful to you. Your site drives <b>more qualified leads than AngelList</b>.
          <br/>
          Thanks for the follow up! Next position I’ll repeat with you.
        </p>
        <div className='author'>
          <a href='https://twitter.com/kleros_io' target='_blank'>
            <Image centered circular size='tiny' src='https://res.cloudinary.com/cryptojobslist/image/fetch/g_face,c_thumb,w_90,h_90,e_improve,q_auto,fl_lossy,f_auto/dpr_2.0/https://res.cloudinary.com/cryptojobslist/image/upload/v1515861481/r3agu0zrctzu5mnqrhvp.jpg' />
          </a>
          <p>
            <b><a href='https://twitter.com/kleros_io' target='_blank'>Maria T. Vidal</a></b><br/>
            Communications Lead, <a href="https://cryptojobslist.com/blockchain-companies/kleros" target='_blank'>Kleros</a>
            <br/>
            <Rating maxRating={5} defaultRating={5} icon='star' size='tiny' disabled/><br/>
          </p>
        </div>
      </div>
    </div>
  }
}

export default Testimonials;
