import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AdicionarFilmesScreen from './src/screens/AdicionarFilmesScreen';
import ListarFilmesScreen from './src/screens/ListarFilmesScreen';
import DetalhesFilmesScreen from './src/screens/DetalhesFilmesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListaFilmes">
        <Stack.Screen
          name="ListaFilmes"
          component={ListarFilmesScreen}
          options={{ 
            title: 'Meus Filmes',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#f5f5f5'
            },
            headerTintColor: '#171717',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20
            }
          }}
        />

        <Stack.Screen
          name="AdicionarFilme"
          component={AdicionarFilmesScreen}
          options={{ 
            title: 'Avaliar Filme',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#f5f5f5'
            },
            headerTintColor: '#171717',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20
            }
          }}
        />

        <Stack.Screen
          name="Detalhes"
          component={DetalhesFilmesScreen}
          options={{ 
            title: 'Detalhes do Filme',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#f5f5f5'
            },
            headerTintColor: '#171717',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}