const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const groupId = ###
const accessToken = ###
const version = ###

app.use(bodyParser.json());


async function fetchData(groupId) {
    try {
        const response = await axios.get('https://api.vk.com/method/groups.getMembers', {
            params: {
                group_id: groupId,
                sort: 'id_asc',
                fields: 'photo_400_orig',
                access_token: accessToken,
                v: version,
            },
        });
        return response.data || {};
    } catch (error) {
        throw new Error(`Ошибка при получении участников группы: ${error.message}`);
    }
}


app.post('/get-members', async (req, res) => {
    try {
        const members = await fetchData(groupId);
        res.json(members);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


async function fetchData2(userId) {
    try {
        const response = await axios.get('https://api.vk.com/method/users.get', {
            params: {
                user_ids: userId,
                fields: 'photo_400_orig,status',
                access_token: accessToken,
                v: version,
            },
        });
        return response.data || {};
    } catch (error) {
        throw new Error(`Ошибка при получении данных пользователя: ${error.message}`);
    }
}


app.post('/get-userInfo', async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).send('Не указан параметр userId');
        }

        const userInfo = await fetchData2(userId);
        res.json(userInfo);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
