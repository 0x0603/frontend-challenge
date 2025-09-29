"use client";

import { Button, Container, Heading, Stack, Text, VStack } from "@chakra-ui/react";

export default function Home() {
  return (
    <Container maxW="container.md" py={16}>
      <VStack gap={6} align="stretch">
        <Heading size="lg">Next.js + Chakra UI</Heading>
        <Text color="fg.muted">SCSS, ESLint, and Prettier are configured.</Text>
        <Stack direction="row" gap={4}>
          <Button colorScheme="blue">Primary</Button>
          <Button variant="outline">Secondary</Button>
        </Stack>
      </VStack>
    </Container>
  );
}
