import {useEffect} from "react";
import {supabase} from "@/integrations/supabase/client.ts";
import {useNavigate} from "react-router-dom";

export const useAuthCheck = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const {data: {session}} = await supabase.auth.getSession();
            if (!session) navigate("/auth");
        };

        checkAuth();

        const {data: {subscription}} = supabase.auth.onAuthStateChange((_event, session) => {
            if (!session) navigate("/auth");
        });

        return () => subscription.unsubscribe();
    }, [navigate]);
};