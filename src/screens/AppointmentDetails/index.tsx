import React, { useState, useEffect } from 'react';
import { Alert, FlatList, ImageBackground, Text, View } from 'react-native';
import { api } from '../../services/api';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import { Fontisto } from '@expo/vector-icons';
import BannerImg from '../../assets/banner.png';
import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { ListHeader } from '../../components/ListHeader';
import { Member, MemberProps } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';
import { AppointmentProps } from '../../components/Appointments';
import { Load } from '../../components/Load';
import { theme } from '../../global/styles/theme';
import { styles } from './styles';

type Params = {
  guildSelected: AppointmentProps;
};

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
};

export function AppointmentDetails() {
  const route = useRoute();
  const [loading, setLoading] = useState(true);
  const { guildSelected } = route.params as Params;
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);

  const fetchGuildWidget = async () => {
    try {
      const response = await api.get(
        `/guilds/${guildSelected.guild.id}/widget.json`
      );
      setWidget(response.data);
    } catch {
      Alert.alert(
        'Atenção',
        'Verifique as configurações do servidor. Será que o Widget está habilitado?'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleShareGame = () => {
    Alert.alert('Compartilhar', 'Compartilhando seu link...');
  };

  const handleStartGame = () => {
    Alert.alert('Entrar', 'Você está entrando na partida...');
  };

  useEffect(() => {
    fetchGuildWidget();
  }, []);

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          <BorderlessButton activeOpacity={0.7} onPress={handleShareGame}>
            <Fontisto name="share" size={24} color={theme.colors.primary} />
          </BorderlessButton>
        }
      />

      <ImageBackground style={styles.banner} source={BannerImg}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>{guildSelected.guild.name}</Text>
          <Text style={styles.subtitle}>{guildSelected.description}</Text>
        </View>
      </ImageBackground>

      {loading ? (
        <Load />
      ) : (
        <>
          <ListHeader
            title="Jogadores"
            subtitle={`Total ${widget.members.length}`}
          />
          <FlatList
            data={widget.members}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Member data={item} />}
            ItemSeparatorComponent={() => <ListDivider isCentered />}
            style={styles.members}
            contentContainerStyle={{ paddingBottom: 69 }}
          />
        </>
      )}
      <View style={styles.footer}>
        <ButtonIcon title="Entrar na partida" onPress={handleStartGame} />
      </View>
    </Background>
  );
}
