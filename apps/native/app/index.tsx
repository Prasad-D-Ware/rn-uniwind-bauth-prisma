import { Button, Card } from "heroui-native";
import { Link } from "expo-router";
import { Text, View } from "react-native";

import { Container } from "@/components/container";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { data: session } = authClient.useSession();

  return (
    <Container className="p-6">
      <View className="flex-1 justify-center">
        <Card variant="secondary" className="p-6">
          <Text className="text-2xl font-bold text-foreground mb-4">
            Welcome
          </Text>
          
          {session?.user ? (
            <View className="gap-4">
              <Text className="text-foreground">
                Hello, {session.user.name}
              </Text>
              <Text className="text-muted text-sm">
                {session.user.email}
              </Text>
              <Button
                onPress={() => authClient.signOut()}
                variant="ghost"
              >
                <Button.Label>Sign Out</Button.Label>
              </Button>
            </View>
          ) : (
            <View className="gap-3">
              <Text className="text-muted mb-2">
                Sign in to access your account
              </Text>
              <Link href="/sign-in" asChild>
                <Button>
                  <Button.Label>Sign In</Button.Label>
                </Button>
              </Link>
              <Link href="/sign-up" asChild>
                <Button variant="ghost">
                  <Button.Label>Create Account</Button.Label>
                </Button>
              </Link>
            </View>
          )}
        </Card>
      </View>
    </Container>
  );
}
