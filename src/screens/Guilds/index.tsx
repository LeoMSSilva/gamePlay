import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

import { Guild, GuildProps } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';
import { Load } from '../../components/Load';
import { api } from '../../services/api';
import { styles } from './styles';

type Props = {
  handleGuildSelect: (guild: GuildProps) => void;
};

export function Guilds({ handleGuildSelect }: Props) {
  const [guilds, setGuilds] = useState<GuildProps[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGuilds = async () => {
    const response = await api.get<GuildProps[]>('/users/@me/guilds');
    setGuilds(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchGuilds();
  }, []);

  const separator = () => <ListDivider isCentered />;

  return (
    <View style={styles.container}>
      {loading ? (
        <Load />
      ) : (
        <FlatList
          data={guilds}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Guild
              data={item}
              onPress={() => handleGuildSelect(item)}
            />
          )}
          ItemSeparatorComponent={separator}
          ListHeaderComponent={separator}
          showsVerticalScrollIndicator={false}
          style={styles.guilds}
        />
      )}
    </View>
  );
}
