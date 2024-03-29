import React, { useEffect, useState } from 'react';
import { Alert, FlatList, ImageBackground, Text, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { useRoute } from '@react-navigation/native';

import { Fontisto } from '@expo/vector-icons';

import BannerImg from '~/assets/banner.png';
import { AppointmentProps } from '~/components/Appointments';
import { Background } from '~/components/Background';
import { ButtonIcon } from '~/components/ButtonIcon';
import { Header } from '~/components/Header';
import { ListDivider } from '~/components/ListDivider';
import { ListHeader } from '~/components/ListHeader';
import { Load } from '~/components/Load';
import { Member, MemberProps } from '~/components/Member';
import { api } from '~/services/api';
import { theme } from '~/styles/theme';

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
  const { guildSelected } = route.params as Params;

  const [loading, setLoading] = useState(true);
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);

  const handleShareGame = () => {
    Alert.alert('Compartilhar', 'Compartilhando seu link...');
  };

  const handleStartGame = () => {
    Alert.alert('Entrar', 'Você está entrando na partida...');
  };

  const fetchGuildWidget = async () => {
    try {
      const response = await api.get<GuildWidget>(
        `/guilds/${guildSelected.guild.id}/widget.json`,
      );
      setWidget(response.data);
    } catch {
      Alert.alert(
        'Atenção',
        'Verifique as configurações do servidor. Será que o Widget está habilitado?',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuildWidget();
  }, []);

  const separator = () => <ListDivider isCentered />;

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          <BorderlessButton
            activeOpacity={0.7}
            onPress={handleShareGame}
          >
            <Fontisto
              name="share"
              size={24}
              color={theme.colors.primary}
            />
          </BorderlessButton>
        }
      />

      <ImageBackground
        style={styles.banner}
        source={BannerImg}
      >
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
            ItemSeparatorComponent={separator}
            style={styles.members}
          />
        </>
      )}
      <View style={styles.footer}>
        <ButtonIcon
          title="Entrar na partida"
          onPress={handleStartGame}
        />
      </View>
    </Background>
  );
}
