import React, { useCallback, useState } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { AppointmentProps, Appointments } from '../../components/Appointments';
import { Background } from '../../components/Background';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListDivider } from '../../components/ListDivider';
import { ListHeader } from '../../components/ListHeader';
import { Load } from '../../components/Load';
import { Profile } from '../../components/Profile';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import { styles } from './styles';

export function Home() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);

  const handleAppointmentDetails = (guildSelected: AppointmentProps) => {
    navigation.navigate('AppointmentDetails', { guildSelected });
  };

  const handleAppointmentCreate = () => {
    navigation.navigate('AppointmentCreate');
  };

  const handleCategorySelect = (categoryId: string) => {
    categoryId === category ? setCategory('') : setCategory(categoryId);
  };

  const loadAppointments = async () => {
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const storage = (
      response ? JSON.parse(response) : []
    ) as AppointmentProps[];
    if (category) {
      setAppointments(storage.filter((item) => item.category === category));
    } else {
      setAppointments(storage);
    }
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadAppointments();
    }, [category]),
  );

  const separator = () => <ListDivider />;

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Profile />
          <ButtonAdd onPress={handleAppointmentCreate} />
        </View>

        <CategorySelect
          categorySelected={category}
          setCategory={handleCategorySelect}
        />

        <ListHeader
          title="Partidas agendadas"
          subtitle={`Total ${appointments.length}`}
        />
        {loading ? (
          <Load />
        ) : (
          <FlatList
            data={appointments}
            keyExtractor={(item) => item.id}
            style={styles.matches}
            ItemSeparatorComponent={separator}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Appointments
                data={item}
                onPress={() => handleAppointmentDetails(item)}
              />
            )}
          />
        )}
      </SafeAreaView>
    </Background>
  );
}
