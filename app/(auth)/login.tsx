import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { auth } from '@/lib/firebase';
import { Stack } from 'expo-router';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Pressable,
    StyleSheet,
    TextInput,
} from 'react-native';

export default function LoginScreen() {
  // 1. Estados para los campos del formulario y la carga
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // 2. Función para iniciar sesión
  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  // 3. Función para crear una nueva cuenta
  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: 'Login' }} />
      <ThemedText type="title">Bienvenido</ThemedText>

      {/* 4. Campos de texto para email y contraseña */}
      <TextInput
        value={email}
        style={styles.input}
        placeholder="correo@ejemplo.com"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        secureTextEntry={true} // Oculta el texto para la contraseña
        value={password}
        style={styles.input}
        placeholder="Contraseña"
        autoCapitalize="none"
        onChangeText={(text) => setPassword(text)}
      />

      {/* 5. Si está cargando, muestra un spinner. Si no, los botones.
       */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Pressable style={styles.button} onPress={signIn}>
            <ThemedText style={styles.buttonText}>Iniciar Sesión</ThemedText>
          </Pressable>
          <Pressable style={[styles.button, styles.buttonOutline]}
            onPress={signUp}>
            <ThemedText style={styles.buttonOutlineText}>Crear Cuenta</ThemedText>
          </Pressable>
        </>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#f73d3dff',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#f73d3dff',
  },
  buttonOutlineText: {
    color: '#f73d3dff',
    fontWeight: 'bold',
  },
});