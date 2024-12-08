import { View, Text, ActivityIndicator, Image, ScrollView, TouchableOpacity, FlatList, RefreshControl } from "react-native";
import MyStyles from "../../styles/MyStyles";
import React from 'react'
import APIs, { endpoints } from "../../configs/APIs";
import { Chip, List, Searchbar } from "react-native-paper";

const Home = () => {
    const [categories, setCategories] = React.useState([]);
    const [courses, setCourses] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [cateId, setCateId] = React.useState("");
    const [page, setPage] = React.useState(1);
    const [q, setQ] = React.useState("");

    const loadCates = async () => {
        let res = await APIs.get(endpoints['categories']);
        console.info(res.data);
        setCategories(res.data);
    }

    const loadCourses = async () => {
       if (page > 0) {
            setLoading(true);

            try {
                let url = `${endpoints['courses']}?page=${page}`;

                if (cateId || q)
                    url = `${url}&category_id=${cateId}&q=${q}`;

                console.info(url);

                let res = await APIs.get(url);
                if (page > 1)
                    setCourses([...courses, ...res.data.results]);
                else
                    setCourses(res.data.results);

                if (res.data.next === null)
                    setPage(0);
            } catch (ex) {
                console.error(ex);
            } finally {
                setLoading(false);
            }
       }
    }

    React.useEffect(() => {
        loadCates();
    }, []);

    React.useEffect(() => {
        let timer = setTimeout(() => loadCourses(), 500);

        return () => clearTimeout(timer);
    }, [cateId, page, q]);

    const loadMore = () => {
        if (page > 0 && !loading)
            setPage(page + 1);
    }

    const search = (value, callback) => {
        setPage(1);
        callback(value)
    }

    const refresh = () => {
        setPage(1);
        loadCourses()
    }

    return (
        <View style={[MyStyles.container, MyStyles.margin]}>
            <Text style={MyStyles.subject}>DANH MỤC KHÓA HỌC</Text>

            <View style={MyStyles.row}>
                <TouchableOpacity onPress={() => search("", setCateId)} ><Chip style={MyStyles.margin} icon="label">Tất cả</Chip></TouchableOpacity>
                {categories.map(c => <TouchableOpacity onPress={() => search(c.id, setCateId)} key={c.id}><Chip style={MyStyles.margin} icon="label" >{c.name}</Chip></TouchableOpacity>)}
            </View>
            {loading && <ActivityIndicator />}

            <Searchbar placeholder="Tìm khóa học..." value={q} onChangeText={t => search(t, setQ)} />

            <FlatList refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} />} onEndReached={loadMore} data={courses} 
                renderItem={({item}) => <List.Item key={item.id} title={item.subject} description={item.created_date} left={() => <Image source={{uri: item.image}} style={MyStyles.box} />} />} />
            
        </View> 
    );
}


export default Home;