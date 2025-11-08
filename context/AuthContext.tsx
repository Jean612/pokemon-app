import { auth, db } from "@/lib/firebase";
import { Favorite } from "@/types/favorite";
import { Team } from "@/types/team";
import { User, onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

interface AuthContextType {
  session: User | null;
  loading: boolean;
  favorites: Favorite[];
  team: Team | null;
  addFavorite: (pokemonName: string, pokemonUrl: string) => Promise<void>;
  removeFavorite: (pokemonName: string) => Promise<void>;
  loadingFavorites: boolean;
  addToTeam: (pokemonName: string, pokemonId: Number) => Promise<void>;
  removeFromTeam: (pokemonId: Number) => Promise<void>;
  loadingTeam: boolean;
  fullTeam: boolean;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
  favorites: [],
  team: null,
  addFavorite: async () => {},
  removeFavorite: async () => {},
  loadingFavorites: true,
  addToTeam: async () => {},
  removeFromTeam: async () => {},
  loadingTeam: true,
  fullTeam: false,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loadingFavorites, setLoadingFavorites] = useState(true);
  const [team, setTeam] = useState<Team | null>(null);
  const [loadingTeam, setLoadingTeam] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setSession(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) {
      setTeam(null);
      setLoadingTeam(false);
      return;
    }

    setLoadingTeam(true);
    const q = query(
      collection(db, "teams"),
      where("userId", "==", session.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        setTeam(null);
      } else {
        const teamDoc = snapshot.docs[0];
        setTeam({ id: teamDoc.id, ...teamDoc.data() } as Team);
      }
      setLoadingTeam(false);
    });

    return () => unsubscribe();
  }, [session]);

  const addToTeam = async (pokemonName: string, pokemonId: Number) => {
    if (!session) return;

    if (team) {
      if (team.pokemons && team.pokemons.length >= 6) {
        Alert.alert("Equipo lleno", "Tu equipo ya tiene 6 Pokémon");
        return;
      }

      const teamRef = doc(db, "teams", team.id);
      await updateDoc(teamRef, {
        pokemons: [...team.pokemons, { name: pokemonName, id: pokemonId }],
      });
    } else {
      await addDoc(collection(db, "teams"), {
        userId: session.uid,
        pokemons: [{ name: pokemonName, id: pokemonId }],
      });
    }
  };

  const removeFromTeam = async (pokemonId: Number) => {
    if (!session || !team) return;

    const teamRef = doc(db, "teams", team.id);
    await updateDoc(teamRef, {
      pokemons: team.pokemons.filter((pokemon) => pokemon.id !== pokemonId),
    });
  };

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
      setLoadingFavorites(false);
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

  const fullTeam = team?.pokemons.length === 6;

  const value = {
    session,
    loading,
    favorites,
    addFavorite,
    removeFavorite,
    loadingFavorites,
    team,
    addToTeam,
    removeFromTeam,
    loadingTeam,
    fullTeam,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
