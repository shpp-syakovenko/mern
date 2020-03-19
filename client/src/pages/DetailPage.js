import React, {useCallback, useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'; // Hook для получения параметров
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {LinkCard} from "../components/LinkCard";

export const DetailPage = () => {
    const { token } = useContext(AuthContext);
    const { request, loading } = useHttp();
    const [link, setLink] = useState(null);
    const linkId = useParams().id; // id прописан в роуте

    const getLink = useCallback(async () => {
        try{
            // Получаем данные о ссылке
            const data = await request(`/api/link/${linkId}`,"GET", null, {
                authorization: `Bearer ${token}`
            });
            setLink(data);
        }catch (e) {

        }
    },[token, linkId, request]);

    useEffect(() => {
        getLink();
    },[getLink]);

    if(loading){
        return <Loader/>
    }

    return (
        <>
            {!loading && link && <LinkCard link={link} />}
        </>
    )
};