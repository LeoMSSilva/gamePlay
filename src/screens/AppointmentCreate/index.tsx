import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';

import { Background } from '../../components/Background';
import { Button } from '../../components/Button';
import { CategorySelect } from '../../components/CategorySelect';
import { GuildProps } from '../../components/Guild';
import { GuildIcon } from '../../components/GuildIcon';
import { Header } from '../../components/Header';
import { ModalView } from '../../components/ModalView';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import { theme } from '../../global/styles/theme';
import { Guilds } from '../Guilds';
import { styles } from './styles';

type Appointment = {
  id: string | number[];
  guild: GuildProps;
  category: string;
  data: string;
  description: string;
};

export function AppointmentCreate() {
  const navigation = useNavigation();
  const [category, setCategory] = useState('');
  const [openGuildsModal, setOpenGuildsModal] = useState(false);
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps);
  const [day, setDay] = useState('');
  const [mouth, setMouth] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [description, setDescription] = useState('');

  const handleCloseGuilds = () => setOpenGuildsModal(false);

  const handleOpenGuildsModal = () => setOpenGuildsModal(true);

  const handleCategorySelect = (categoryId: string) => setCategory(categoryId);

  const handleGuildSelect = (guildSelected: GuildProps) => {
    setGuild(guildSelected);
    setOpenGuildsModal(false);
  };

  const validation = () => {
    if (!category) {
      Alert.alert('Atenção', 'Você deve selecionar uma categoria.');
      return false;
    }
    if (!guild.id) {
      Alert.alert('Atenção', 'Você deve selecionar um servidor.');
      return false;
    }
    if (!day) {
      Alert.alert('Atenção', 'Você deve informar o dia.');
      return false;
    }
    if (Number(day) < 1 || Number(day) > 31) {
      Alert.alert('Atenção', 'Dia inválido.');
      return false;
    }
    if (!mouth) {
      Alert.alert('Atenção', 'Você deve informar o mês.');
      return false;
    }
    if (Number(mouth) < 1 || Number(mouth) > 12) {
      Alert.alert('Atenção', 'Esse mês não existe.');
      return false;
    }
    if (Number(mouth) === 2 && Number(day) > 29) {
      Alert.alert('Atenção', 'Dia inválido.');
      return false;
    }
    if (
      (Number(mouth) === 4 ||
        Number(mouth) === 6 ||
        Number(mouth) === 9 ||
        Number(mouth) === 11) &&
      Number(day) > 30
    ) {
      Alert.alert('Atenção', 'Dia inválido.');
      return false;
    }
    if (!hour) {
      Alert.alert('Atenção', 'Você deve informar as horas.');
      return false;
    }
    if (Number(hour) > 23 || Number(hour) < 0) {
      Alert.alert('Atenção', 'Hora inválida.');
      return false;
    }
    if (!minute) {
      Alert.alert('Atenção', 'Você deve informar os minutos.');
      return false;
    }
    if (Number(minute) > 59 || Number(minute) < 0) {
      Alert.alert('Atenção', 'Minutos inválido.');
      return false;
    }
    if (!description) {
      Alert.alert('Atenção', 'Você deve informar a descrição.');
      return false;
    }
    return true;
  };

  const saveWithoutStorage = async (newAppointment: Appointment) => {
    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const appointments = (storage ? JSON.parse(storage) : []) as [];
    await AsyncStorage.setItem(
      COLLECTION_APPOINTMENTS,
      JSON.stringify([...appointments, newAppointment]),
    );
  };

  const handleToSchedule = () => {
    const isValid = validation();
    console.log(isValid);

    if (isValid) {
      const newAppointment = {
        id: uuid.v4(),
        guild,
        category,
        data: `${day}/${mouth} às ${hour}:${minute}`,
        description,
      };

      saveWithoutStorage(newAppointment);

      navigation.navigate('Home');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView>
        <Background>
          <Header title="Agendar Partida" />

          <Text style={[styles.title]}>Categoria</Text>

          <CategorySelect
            hasCheckBox
            categorySelected={category}
            setCategory={handleCategorySelect}
          />

          <View style={styles.form}>
            <RectButton onPress={handleOpenGuildsModal}>
              <View style={styles.select}>
                {guild.icon ? (
                  <GuildIcon
                    guildId={guild.id}
                    iconId={guild.icon}
                  />
                ) : (
                  <View style={styles.image} />
                )}
                <View style={styles.selectBody}>
                  <Text style={styles.label}>
                    {guild.name ? guild.name : 'Selecione um servidor'}
                  </Text>
                </View>
                <Feather
                  name="chevron-right"
                  color={theme.colors.heading}
                  size={18}
                />
              </View>
            </RectButton>

            <View style={styles.field}>
              <View>
                <Text style={styles.label}>Dia e Mês</Text>
                <View style={styles.column}>
                  <SmallInput
                    maxLength={2}
                    onChangeText={setDay}
                  />
                  <Text style={styles.divider}>/</Text>
                  <SmallInput
                    maxLength={2}
                    onChangeText={setMouth}
                  />
                </View>
              </View>

              <View>
                <Text style={styles.label}>Hora e Minuto</Text>
                <View style={styles.column}>
                  <SmallInput
                    maxLength={2}
                    onChangeText={setHour}
                  />
                  <Text style={styles.divider}>:</Text>
                  <SmallInput
                    maxLength={2}
                    onChangeText={setMinute}
                  />
                </View>
              </View>
            </View>

            <View style={[styles.fieldDescription]}>
              <Text style={styles.label}>Descrição</Text>
              <Text style={styles.caracteresLimit}>Max 100 caracteres</Text>
            </View>
            <TextArea
              multiline
              maxLength={100}
              numberOfLines={5}
              autoCorrect={false}
              onChangeText={setDescription}
            />

            <View style={styles.footer}>
              <Button
                title="Agendar"
                onPress={handleToSchedule}
              />
            </View>
          </View>
        </Background>
      </ScrollView>

      <ModalView
        visible={openGuildsModal}
        closeModal={handleCloseGuilds}
      >
        <Guilds handleGuildSelect={handleGuildSelect} />
      </ModalView>
    </KeyboardAvoidingView>
  );
}
