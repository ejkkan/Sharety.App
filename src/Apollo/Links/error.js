import { onError } from 'apollo-link-error';
import Navigation from '../../utils/Navigation';


export const errorLink = onError(({ graphQLErrors, networkError }) => {
    //Navigation.navigate("Login")
    console.log('[ERRORS]: ', graphQLErrors, networkError)
})
