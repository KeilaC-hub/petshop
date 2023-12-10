import { db } from '../firebase/config';

import{
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth';

import { useState, useEffect } from 'react';

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    //cleanup
    //deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        };
    };

    const createUser = async(data) => {
        checkIfIsCancelled();

        setLoading(true);
        setError(null);

        try {
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            await updateProfile(user, {displayName: data.displayName});

            setLoading(false);

            return user;

        } catch (err) {

            let systemErrorMessage;

            if (err.message.includes('Password')) {
                systemErrorMessage = 'A senha precisa conter pelo menos 6 caracteres.'
            }else if (err.message.includes('email-already')) {
                systemErrorMessage = 'E-mail já cadastrado.'
            }else{
                systemErrorMessage = 'Ocorreu um erro, por favor tente mais tarde.'
            };
            setLoading(false);
            setError(systemErrorMessage);
        };

        
    };

    //logout - sign out
    const logout = () => {
        checkIfIsCancelled();

        signOut(auth);
    };

    //login - sign in
    const login = async(data) => {
        checkIfIsCancelled();
        setLoading(true);
        setError(false);

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            setLoading(false);

        } catch (err) {

            if (err.message.includes('user-not-found')) {
                setError('Usuário não encontrado.')
            }else if (err.message.includes('wrong-password')) {
                setError('Senha incorreta.')
            }else{
                setError('Ocorreu um erro, por favor tente mais tarde.')
            }
            setLoading(false);
        }
    }

    useEffect(() => {
        return () => setCancelled(true);
    }, [])

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login,
    };
};
