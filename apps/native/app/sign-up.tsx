import { Button, FieldError, Input, Label, Spinner, Surface } from "heroui-native";
import { useState } from "react";
import { Text, View } from "react-native";
import { Link, router } from "expo-router";

import { Container } from "@/components/container";
import { GoogleIcon } from "@/components/google-icon";
import { authClient } from "@/lib/auth-client";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignUp() {
    setIsLoading(true);
    setError(null);

    await authClient.signUp.email(
      {
        name,
        email,
        password,
      },
      {
        onError(error) {
          setError(error.error?.message || "Failed to sign up");
          setIsLoading(false);
        },
        onSuccess() {
          router.replace("/");
        },
        onFinished() {
          setIsLoading(false);
        },
      },
    );
  }

  return (
    <Container className="p-6">
      <View className="flex-1 justify-center">
        <Surface variant="secondary" className="p-6 rounded-lg">
          <Text className="text-2xl font-bold text-foreground mb-6">Create Account</Text>

          <FieldError isInvalid={!!error} className="mb-4">
            {error}
          </FieldError>

          <View className="gap-4">
            <View>
              <Label>Name</Label>
              <Input
                value={name}
                onChangeText={setName}
                placeholder="John Doe"
              />
            </View>

            <View>
              <Label>Email</Label>
              <Input
                value={email}
                onChangeText={setEmail}
                placeholder="email@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View>
              <Label>Password</Label>
              <Input
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                secureTextEntry
              />
            </View>

            <Button 
              onPress={handleSignUp} 
              isDisabled={isLoading}
              className="mt-2"
            >
              {isLoading ? (
                <Spinner size="sm" />
              ) : (
                <Button.Label>Create Account</Button.Label>
              )}
            </Button>

            {/* Divider */}
            <View className="flex-row items-center my-2">
              <View className="flex-1 h-px bg-muted" />
              <Text className="mx-4 text-muted text-sm">or</Text>
              <View className="flex-1 h-px bg-muted" />
            </View>

            {/* Google Sign Up */}
            <Button
              onPress={() => {
                setIsLoading(true);
                authClient.signIn.social({ 
                  provider: "google",
                  callbackURL: "/"
                }, {
                  onError(error) {
                    setError(error.error?.message || "Failed to sign up with Google");
                    setIsLoading(false);
                  },
                  onSuccess() {
                    router.replace("/");
                  },
                  onFinished() {
                    setIsLoading(false);
                  }
                });
              }}
              isDisabled={isLoading}
              variant="outline"
            >
              <View className="flex-row items-center gap-2">
                <GoogleIcon size={20} />
                <Button.Label>Continue with Google</Button.Label>
              </View>
            </Button>

            <Link href="/" asChild>
              <Button variant="ghost">
                <Button.Label>Back to Home</Button.Label>
              </Button>
            </Link>

            <View className="flex-row justify-center mt-4">
              <Text className="text-muted">Already have an account? </Text>
              <Link href="/sign-in">
                <Text className="text-primary font-medium">Sign In</Text>
              </Link>
            </View>
          </View>
        </Surface>
      </View>
    </Container>
  );
}
