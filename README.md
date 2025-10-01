# Frontend Challenge - Mocaverse Referral System

## Demo

🚀 **Live Demo**: [https://mocaverse-frontend.vercel.app/](https://mocaverse-frontend.vercel.app/)

## Setup Instructions

### Prerequisites

- Node.js 18+
- Yarn or npm
- MetaMask wallet (for testing)

### Installation

```bash
# Clone repository
git clone https://github.com/0x0603/frontend-challenge.git
cd frontend-challenge

# Install dependencies
yarn install

# Start development server
yarn dev

# Open http://localhost:3000
```

## Test Data

### Valid Test Data

```typescript
const validTestData = {
  inviteCode: "BCD123",
  email: "test@example.com",
  wallet: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
  signature: "0x1234...abcd",
};
```

### Invalid Test Data

```typescript
const invalidTestData = {
  invalidCode: "abc123",
  usedCode: "xyz123",
  invalidEmail: "invalid-email",
  usedEmail: "test@test.com",
  usedWallet: "0xccb1c45EF084b344B71e29B365fEFeCc8F3fd689",
};
```

## App Workflow

### User Flows

**New User Registration:**

- Enter Code → Enter Email + Connect Wallet → Submit → Success

**Existing User Login:**

- Already Registered → Connect Wallet → Get Data

**Logout:**

- Logout → Clear Session

## Design Decisions

### Framework Choice: Next.js 15

- **App Router**: Modern routing with better performance
- **TypeScript**: Type safety and better developer experience
- **Turbopack**: Faster builds and hot reload

### State Management: Zustand

- **Lightweight**: Minimal boilerplate
- **Persistence**: Automatic localStorage integration
- **TypeScript**: Full type safety

### Web3 Integration: Wagmi

- **Modern**: Latest Web3 React hooks
- **Type-safe**: Full TypeScript support
- **Flexible**: Multiple wallet support

### Form Management: Formik

- **Validation**: Built-in validation system
- **Performance**: Optimized re-renders
- **Developer Experience**: Easy to use API

### API Client: Axios

- **HTTP Client**: Reliable request/response handling
- **Interceptors**: Request/response transformation
- **Error Handling**: Centralized error management
- **Type Safety**: Full TypeScript support

### Web3 Security

- **Message Signing**: Cryptographic authentication
- **Address Validation**: EVM address format checking
- **Wallet Verification**: Connection state management
- **Signature Verification**: Server-side validation

### Security Measures

- **Input Validation**: Client and server-side validation
- **Rate Limiting**: API request throttling
- **Error Boundaries**: Graceful error handling
- **CSRF Protection**: Cross-site request forgery prevention

### Styling: SCSS Modules

- **Scoped**: Component-level styling
- **Responsive**: Mobile-first approach
- **Maintainable**: Clear structure

### Test Cases Covered

1. **Valid flow**: Enter code → Connect wallet → Submit
2. **Invalid code**: Error message display
3. **Used email**: Error handling
4. **Used wallet**: Error handling
5. **Network errors**: Graceful degradation
6. **Multiple submissions**: Button protection
7. **Wallet connection failures**: Error handling
8. **Signature failures**: Authentication errors
9. **Form validation**: Real-time validation
10. **Responsive design**: Mobile/tablet/desktop
11. **Loading states**: UI feedback during operations
12. **Already registered flow**: Login with existing wallet
13. **Logout functionality**: Session clearing
14. **Error boundaries**: Component error handling
15. **Accessibility**: Keyboard navigation and screen readers

## Future Improvements

### If I had more time, I would:

1. **Advanced Referral System**
   - Multi-level referral tracking (A→B→C→D→E)
   - Commission calculation for 5 levels
   - Referral tree visualization
   - Advanced analytics dashboard

2. **Social Sharing Features**
   - Share referral codes on social media
   - Generate shareable links with tracking
   - Social media integration (Twitter, Discord, Telegram)
   - Viral marketing tools
   - Referral link analytics

3. **Multi-Wallet Support**
   - WalletConnect integration
   - Coinbase Wallet support
   - Rainbow Wallet support
   - Wallet switching functionality

4. **Add PWA Features**
   - Offline support
   - Push notifications
   - App-like experience

5. **Add Performance Optimizations**
   - React.memo for expensive components
   - Code splitting
   - Image optimization

6. **Add Analytics**
   - User behavior tracking
   - Conversion metrics
   - Error monitoring

7. **Add Testing Suite**
   - Unit tests with Jest and React Testing Library
   - Integration tests for API calls
   - E2E tests with Playwright
