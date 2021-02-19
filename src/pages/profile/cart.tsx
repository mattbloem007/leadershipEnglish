import React, {useRef, useEffect} from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout2'
import SEO from '../../components/SEO'

import SkuCard from '../../components/Products/SkuCard'
import CartOverview from '../../components/CartOverview'
import { getProfile } from "../../utils/auth"

import { loadStripe } from '@stripe/stripe-js'
import { CartProvider } from 'use-shopping-cart'
import {usePageContext} from '../../../PageContext'
import { Elements } from '@stripe/react-stripe-js';


const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY)
let user = null;

function useDidMount() {
  const didMountRef = useRef(true);

  useEffect(() => {
    didMountRef.current = false;
    getProfile().then((result) => {
      user = result['https://app.io/user_metadata']
    })
  }, []);
  return didMountRef.current;
};

const CartExample = (props) => {
  const {originalPath, lang} = usePageContext()
  console.log(props)
  const didMount = useDidMount();
  const [state, setState] = React.useState(0);

  const update = () => {
   setState(user)
  }

  useEffect(() => {
    if(didMount) {
     console.log('mounted');
    } else {
     console.log('called', state);
    }
  }, [state, didMount]);

  return (

    <Layout>
      <SEO title="Cart Example" />
      <h1>Future Leadership Offerings</h1>

      <CartProvider
        mode="client-only"
        stripe={stripePromise}
        successUrl={`https://futureleadership.online/${lang}${originalPath}`}
        cancelUrl={`https://futureleadership.online/${lang}${originalPath}`}
        currency="USD"
        allowedCountries={['US', 'GB', 'CA']}
        billingAddressCollection={true}
      >
      <Elements stripe={stripePromise}>
        <CartOverview user={user}/>
      </Elements>
      {(() => {
         if (lang != 'cn') {
           return (
             <SkuCard prices={props.data.prices}/>
           )
         } else if (lang == 'cn') {
           return (
             <SkuCard prices={props.data.prices2}/>
           )
         }
       })()}
      </CartProvider>
    </Layout>
  )

}


export default CartExample

export const query = graphql`
query ProductPrices2 {
prices: allStripePrice(filter: {active: {eq: true}, currency: {eq: "usd"}}, sort: {fields: [unit_amount]}) {
  edges {
    node {
      id
      active
      currency
      unit_amount
      unit_amount_decimal
      product {
        id
        active
        name
        description
        livemode
      }
      type
    }
  }
}
prices2: allStripePrice(filter: {active: {eq: true}, currency: {eq: "cny"}}, sort: {fields: [unit_amount]}) {
  edges {
    node {
      id
      active
      currency
      unit_amount
      unit_amount_decimal
      product {
        id
        active
        name
        description
        livemode
      }
      type
    }
  }
}
}

`
