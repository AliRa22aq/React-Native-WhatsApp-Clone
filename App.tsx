import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

// import { withAuthenticator } from 'aws-amplify-react-native'
// declare module 'aws-amplify-react-native';


import { withAuthenticator } from 'aws-amplify-react-native'
import {Auth, API, graphqlOperation} from 'aws-amplify'

// import {getUser} from './screens/queries'
import {createUser} from './src/graphql/mutations'
import {getUser} from './src/graphql/queries'


import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)


const randomeImages = [
  'https://i.pinimg.com/474x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg',
  'https://i.pinimg.com/474x/86/ea/e3/86eae3d8abc2362ad6262916cb950640.jpg',
  'https://i.pinimg.com/originals/35/32/b2/3532b2e610f871b0b8ebb1dab43e87f1.jpg',
  'https://i.pinimg.com/474x/45/11/c5/4511c5871ff8011385b023be70878d81.jpg',

]

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const getRandomUmages = () => {
    return randomeImages[Math.floor(Math.random()*randomeImages.length)]
  }

  // run this snippet only when App is first mounted
  useEffect(() => {

    const fetchUser = async () => {

      // get authenticated user from the Auth
      const userInfo = await Auth.currentAuthenticatedUser({
        bypassCache: true
      })

      // console.log(userInfo)
     
      if (userInfo) {
        //get the user froom Backend with the user ID from Auth
        const userData = await API.graphql(
            graphqlOperation(
              getUser, {id: userInfo.attributes.sub }
              ))

        if (userData.data.getUser) {
          // console.log('User is already registered in the database');
          return;
        }

        const newUser = {
          id: userInfo.attributes.sub,
          name: userInfo.username,
          imageUri:getRandomUmages(),
          status: "Hye I am using WhatsAppByAli"
        }
        // console.log(newUser)

          await API.graphql(
            graphqlOperation(
              createUser,
              {input: newUser}
            )
          )
      } 



      // If there is a not user in DB with the id then create one
    }

    fetchUser();

  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
export default withAuthenticator(App)
