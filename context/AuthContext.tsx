import { auth, db } from "@/lib/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  session: User | null;
  loading: boolean;
  favorites: Favorite[];
  addFavorite: (pokemonName: string, pokemonUrl: string) => Promise<void>;
  removeFavorite: (pokemonName: string) => Promise<void>;
  loadingFavorites: boolean;
}

export interface Favorite {
  id: string;
  userId: string;
  pokemonName: string;
  pokemonUrl: string;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
  favorites: [],
  addFavorite: async () => {},
  removeFavorite: async () => {},
  loadingFavorites: true,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loadingFavorites, setLoadingFavorites] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setSession(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 1. Creamos una consulta para obtener solo los favoritos del usuario actual
  useEffect(() => {
    if (!session) {
      setFavorites([]);
      setLoadingFavorites(false);
      return;
    }

    setLoadingFavorites(true);
    const q = query(
      collection(db, "favorites"),
      where("userId", "==", session.uid)
    );

    // 2. onSnapshot es un listener en tiempo real.
    //    Se ejecuta una vez con los datos iniciales y luego cada vez que los datos cambian.
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const userFavorites: Favorite[] = [];
      querySnapshot.forEach((doc) => {
        userFavorites.push({ id: doc.id, ...doc.data() } as Favorite);
      });
      setFavorites(userFavorites);
      setLoading(false);
    });

    return () => unsubscribe(); // Limpiamos el listener al desmontar
  }, [session]);

  // 3. Función para añadir un favorito
  const addFavorite = async (pokemonName: string, pokemonUrl: string) => {
    if (!session) return;
    await addDoc(collection(db, "favorites"), {
      userId: session.uid,
      pokemonName: pokemonName,
      pokemonUrl: pokemonUrl,
    });
  };

  // 4. Función para quitar un favorito
  const removeFavorite = async (pokemonName: string) => {
    if (!session) return;
    // Buscamos el documento específico para borrarlo
    const q = query(
      collection(db, "favorites"),
      where("userId", "==", session.uid),
      where("pokemonName", "==", pokemonName)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((document) => {
      deleteDoc(doc(db, "favorites", document.id));
    });
  };

  const value = {
    session,
    loading,
    favorites,
    addFavorite,
    removeFavorite,
    loadingFavorites,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
