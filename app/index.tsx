import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const fetchData = async () => {
  const res = await fetch("api/playerIndex");
  return res.json();
};

const queryClient = new QueryClient();

const Page = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Content />
    </QueryClientProvider>
  );
};

const Content = () => {
  const { data, isLoading, error } = useQuery("data", fetchData);

  if (error) {
    throw new Error("Error fetching data");
  }

  if (isLoading) {
    return "Loading...";
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <ul style={{ overflow: "scroll" }}>
        {data.playerIndex.map((player: any, i: number) => {
          return (
            <li key={i}>
              <Text>
                {player.firstName} {player.lastName}
              </Text>
            </li>
          );
        })}
      </ul>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Page;
