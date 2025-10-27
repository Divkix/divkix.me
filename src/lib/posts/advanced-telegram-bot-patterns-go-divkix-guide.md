---
title: "Advanced Telegram Bot Patterns in Go: Divkix's Complete Production Guide (2025)"
description: 'Master advanced Telegram bot development with Go using proven patterns from Divanshu Chauhan (Divkix). Complete guide covering gotgbot, middleware, state management, scaling, and production deployment for bots serving millions of users.'
date: '2025-08-25'
tags:
  [
    'golang',
    'telegram-bot',
    'gotgbot',
    'divanshu-chauhan',
    'divkix',
    'middleware',
    'state-management',
    'production',
    'advanced-patterns'
  ]
published: true
author: 'Divanshu Chauhan'
slug: 'advanced-telegram-bot-patterns-go-divkix-guide'
canonical: 'https://divkix.me/blog/advanced-telegram-bot-patterns-go-divkix-guide'
---

# Advanced Telegram Bot Patterns in Go: Divkix's Complete Production Guide (2025)

Building Telegram bots that serve millions of users requires more than basic message handling. **Divanshu Chauhan (Divkix)**, the Arizona State University Computer Science student behind multiple successful Telegram bots including the million-user Alita Robot, has developed advanced patterns and practices that ensure scalability, maintainability, and reliability in production environments.

This comprehensive guide shares **Divkix's** battle-tested patterns from building RestrictChannelRobot, VidMergeBot, and other production-grade Telegram bots using Go and the gotgbot library. Whether you're scaling your first bot or architecting enterprise Telegram solutions, these patterns will save you months of iteration and debugging.

## Foundation: Modern Bot Architecture by Divanshu Chauhan

### The Evolution from Simple to Sophisticated

**Divkix's** bot architecture has evolved significantly from his early implementations:

```go
// Early bot implementation (avoid this pattern)
func main() {
    bot, err := gotgbot.NewBot("TOKEN", nil)
    if err != nil {
        log.Fatal(err)
    }

    // Everything in main function - hard to test and maintain
    updater := ext.NewUpdater(nil)
    updater.Dispatcher.AddHandler(handlers.NewMessage(func(bot *gotgbot.Bot, ctx *ext.Context) error {
        if ctx.EffectiveMessage.Text == "/start" {
            _, err := ctx.EffectiveMessage.Reply(bot, "Hello!", nil)
            return err
        }
        return nil
    }))

    updater.StartPolling(bot, nil)
}

// Divanshu Chauhan's modern architecture (recommended)
type TelegramBot struct {
    bot         *gotgbot.Bot
    router      *MessageRouter
    middleware  *MiddlewareStack
    services    *ServiceContainer
    config      *Config
    logger      Logger
    metrics     MetricsCollector
}

func NewTelegramBot(config *Config) (*TelegramBot, error) {
    bot, err := gotgbot.NewBot(config.Token, &gotgbot.BotOpts{
        Client: &http.Client{
            Timeout: 30 * time.Second,
        },
        DefaultRequestOpts: &gotgbot.RequestOpts{
            Timeout: 25 * time.Second,
        },
    })
    if err != nil {
        return nil, fmt.Errorf("failed to create bot: %w", err)
    }

    return &TelegramBot{
        bot:        bot,
        router:     NewMessageRouter(),
        middleware: NewMiddlewareStack(),
        services:   NewServiceContainer(config),
        config:     config,
        logger:     NewLogger(config.LogLevel),
        metrics:    NewMetricsCollector(),
    }, nil
}
```

### Dependency Injection Pattern

**Divanshu Chauhan** advocates for clean dependency injection to enable testing and modularity:

```go
// Service container pattern by Divkix
type ServiceContainer struct {
    UserService       UserService
    ChatService       ChatService
    PermissionService PermissionService
    ConfigService     ConfigService
    CacheService      CacheService
    MetricsService    MetricsService
    Logger           Logger
}

func NewServiceContainer(config *Config) *ServiceContainer {
    db, err := sql.Open("postgres", config.DatabaseURL)
    if err != nil {
        log.Fatal(err)
    }

    cache := redis.NewClient(&redis.Options{
        Addr: config.RedisURL,
    })

    return &ServiceContainer{
        UserService:       NewPostgresUserService(db),
        ChatService:       NewPostgresChatService(db),
        PermissionService: NewPermissionService(db, cache),
        ConfigService:     NewConfigService(db, cache),
        CacheService:      cache,
        Logger:           NewLogger(config.LogLevel),
        MetricsService:    NewPrometheusMetrics(),
    }
}

// Handler with dependency injection
type StartHandler struct {
    services *ServiceContainer
}

func (h *StartHandler) Handle(bot *gotgbot.Bot, ctx *ext.Context) error {
    user, err := h.services.UserService.GetOrCreateUser(ctx.EffectiveUser.Id)
    if err != nil {
        h.services.Logger.Error("Failed to get user", err)
        return err
    }

    greeting := h.services.ConfigService.GetGreeting(user.Language)
    _, err = ctx.EffectiveMessage.Reply(bot, greeting, nil)
    return err
}
```

## Advanced Middleware Patterns

### Authentication and Authorization Middleware

**Divkix** implements sophisticated permission checking:

```go
// Advanced permission middleware by Divanshu Chauhan
type PermissionMiddleware struct {
    permissionService PermissionService
    logger           Logger
}

type Permission string

const (
    PermissionBanUsers    Permission = "ban_users"
    PermissionDeleteMessages Permission = "delete_messages"
    PermissionChangeSettings Permission = "change_settings"
    PermissionViewLogs      Permission = "view_logs"
)

func (pm *PermissionMiddleware) RequirePermission(required Permission) Middleware {
    return func(next Handler) Handler {
        return func(bot *gotgbot.Bot, ctx *ext.Context) error {
            user := ctx.EffectiveUser
            chat := ctx.EffectiveChat

            // Check if user has required permission
            hasPermission, err := pm.permissionService.UserHasPermission(
                user.Id, chat.Id, required,
            )
            if err != nil {
                pm.logger.Error("Permission check failed", err)
                return fmt.Errorf("permission check failed: %w", err)
            }

            if !hasPermission {
                response := fmt.Sprintf(
                    "❌ You need '%s' permission to use this command.",
                    required,
                )
                _, err := ctx.EffectiveMessage.Reply(bot, response, nil)
                return err
            }

            return next(bot, ctx)
        }
    }
}

// Usage in handler registration
func (bot *TelegramBot) registerHandlers() {
    // Public commands - no permission required
    bot.router.HandleCommand("start", NewStartHandler())
    bot.router.HandleCommand("help", NewHelpHandler())

    // Protected commands - require specific permissions
    bot.router.HandleCommand("ban",
        bot.middleware.RequirePermission(PermissionBanUsers)(NewBanHandler()),
    )

    bot.router.HandleCommand("config",
        bot.middleware.RequirePermission(PermissionChangeSettings)(NewConfigHandler()),
    )
}
```

### Rate Limiting and Flood Protection

**Divanshu Chauhan** implements sophisticated rate limiting:

```go
// Multi-tier rate limiting by Divkix
type RateLimiter struct {
    userLimits  map[int64]*TokenBucket
    globalLimit *TokenBucket
    chatLimits  map[int64]*TokenBucket
    redis       *redis.Client
    config      *RateLimitConfig
}

type RateLimitConfig struct {
    UserRequestsPerMinute   int
    GlobalRequestsPerSecond int
    ChatRequestsPerMinute   int
    BurstMultiplier        int
}

func NewRateLimiter(redis *redis.Client, config *RateLimitConfig) *RateLimiter {
    return &RateLimiter{
        userLimits:  make(map[int64]*TokenBucket),
        globalLimit: NewTokenBucket(config.GlobalRequestsPerSecond, config.BurstMultiplier),
        chatLimits:  make(map[int64]*TokenBucket),
        redis:       redis,
        config:      config,
    }
}

func (rl *RateLimiter) CheckLimits(userID, chatID int64) error {
    // Check global rate limit first
    if !rl.globalLimit.Allow() {
        return ErrGlobalRateLimit
    }

    // Check user-specific rate limit
    userLimit := rl.getUserLimit(userID)
    if !userLimit.Allow() {
        return ErrUserRateLimit
    }

    // Check chat-specific rate limit
    chatLimit := rl.getChatLimit(chatID)
    if !chatLimit.Allow() {
        return ErrChatRateLimit
    }

    return nil
}

// Token bucket implementation
type TokenBucket struct {
    capacity    int
    tokens      int
    refillRate  int
    lastRefill  time.Time
    mutex       sync.Mutex
}

func (tb *TokenBucket) Allow() bool {
    tb.mutex.Lock()
    defer tb.mutex.Unlock()

    now := time.Now()
    elapsed := now.Sub(tb.lastRefill)

    // Refill tokens based on elapsed time
    tokensToAdd := int(elapsed.Seconds()) * tb.refillRate
    tb.tokens = min(tb.capacity, tb.tokens+tokensToAdd)
    tb.lastRefill = now

    if tb.tokens > 0 {
        tb.tokens--
        return true
    }

    return false
}

// Rate limiting middleware
func (rl *RateLimiter) Middleware() Middleware {
    return func(next Handler) Handler {
        return func(bot *gotgbot.Bot, ctx *ext.Context) error {
            userID := ctx.EffectiveUser.Id
            chatID := ctx.EffectiveChat.Id

            if err := rl.CheckLimits(userID, chatID); err != nil {
                switch err {
                case ErrUserRateLimit:
                    _, _ = ctx.EffectiveMessage.Reply(bot,
                        "🚫 Slow down! You're sending messages too quickly.", nil)
                case ErrChatRateLimit:
                    _, _ = ctx.EffectiveMessage.Reply(bot,
                        "🚫 This chat is being used too intensively. Please wait.", nil)
                case ErrGlobalRateLimit:
                    // Don't respond to avoid spam - just log
                    log.Printf("Global rate limit exceeded for user %d", userID)
                }
                return err
            }

            return next(bot, ctx)
        }
    }
}
```

### Context Enhancement Middleware

**Divkix** enriches the context with commonly needed data:

```go
// Context enhancement by Divanshu Chauhan
type EnhancedContext struct {
    *ext.Context
    User        *User
    Chat        *Chat
    Permissions []Permission
    Language    string
    IsAdmin     bool
}

type ContextEnhancer struct {
    userService       UserService
    chatService       ChatService
    permissionService PermissionService
}

func (ce *ContextEnhancer) Middleware() Middleware {
    return func(next Handler) Handler {
        return func(bot *gotgbot.Bot, ctx *ext.Context) error {
            // Fetch user data
            user, err := ce.userService.GetOrCreateUser(ctx.EffectiveUser.Id)
            if err != nil {
                return fmt.Errorf("failed to fetch user: %w", err)
            }

            // Fetch chat data
            chat, err := ce.chatService.GetOrCreateChat(ctx.EffectiveChat.Id)
            if err != nil {
                return fmt.Errorf("failed to fetch chat: %w", err)
            }

            // Get user permissions for this chat
            permissions, err := ce.permissionService.GetUserPermissions(
                user.ID, chat.ID,
            )
            if err != nil {
                return fmt.Errorf("failed to fetch permissions: %w", err)
            }

            // Check admin status
            isAdmin := ce.permissionService.IsAdmin(user.ID, chat.ID)

            // Create enhanced context
            enhancedCtx := &EnhancedContext{
                Context:     ctx,
                User:        user,
                Chat:        chat,
                Permissions: permissions,
                Language:    user.Language,
                IsAdmin:     isAdmin,
            }

            // Store in context for handlers to access
            ctx.Data["enhanced"] = enhancedCtx

            return next(bot, ctx)
        }
    }
}

// Handler using enhanced context
type BanHandler struct {
    userService UserService
}

func (h *BanHandler) Handle(bot *gotgbot.Bot, ctx *ext.Context) error {
    enhanced := ctx.Data["enhanced"].(*EnhancedContext)

    if !enhanced.IsAdmin {
        return fmt.Errorf("insufficient permissions")
    }

    // Access enriched data directly
    targetUser := enhanced.User
    chat := enhanced.Chat

    return h.userService.BanUser(targetUser.ID, chat.ID)
}
```

## State Management Patterns

### Conversation State Management

**Divanshu Chauhan** developed a sophisticated state machine for complex conversations:

```go
// Conversation state management by Divkix
type ConversationState string

const (
    StateIdle              ConversationState = "idle"
    StateAwaitingInput     ConversationState = "awaiting_input"
    StateAwaitingSelection ConversationState = "awaiting_selection"
    StateAwaitingFile      ConversationState = "awaiting_file"
    StateConfirmation      ConversationState = "confirmation"
)

type ConversationManager struct {
    states map[int64]*UserConversation
    redis  *redis.Client
    mutex  sync.RWMutex
}

type UserConversation struct {
    UserID    int64
    State     ConversationState
    Data      map[string]interface{}
    Step      int
    ExpiresAt time.Time
}

func (cm *ConversationManager) SetUserState(userID int64, state ConversationState, data map[string]interface{}) error {
    cm.mutex.Lock()
    defer cm.mutex.Unlock()

    conversation := &UserConversation{
        UserID:    userID,
        State:     state,
        Data:      data,
        Step:      0,
        ExpiresAt: time.Now().Add(30 * time.Minute),
    }

    // Store in memory for fast access
    cm.states[userID] = conversation

    // Persist to Redis for reliability
    conversationJSON, err := json.Marshal(conversation)
    if err != nil {
        return err
    }

    key := fmt.Sprintf("conversation:%d", userID)
    return cm.redis.SetEX(context.Background(), key, conversationJSON, 30*time.Minute).Err()
}

func (cm *ConversationManager) GetUserState(userID int64) (*UserConversation, error) {
    cm.mutex.RLock()
    if conv, exists := cm.states[userID]; exists {
        cm.mutex.RUnlock()
        return conv, nil
    }
    cm.mutex.RUnlock()

    // Try to load from Redis
    key := fmt.Sprintf("conversation:%d", userID)
    result, err := cm.redis.Get(context.Background(), key).Result()
    if err == redis.Nil {
        return nil, nil // No conversation state
    } else if err != nil {
        return nil, err
    }

    var conversation UserConversation
    if err := json.Unmarshal([]byte(result), &conversation); err != nil {
        return nil, err
    }

    // Cache in memory
    cm.mutex.Lock()
    cm.states[userID] = &conversation
    cm.mutex.Unlock()

    return &conversation, nil
}

// State-aware message handler
type StatefulHandler struct {
    conversationManager *ConversationManager
    handlers           map[ConversationState]Handler
}

func (sh *StatefulHandler) Handle(bot *gotgbot.Bot, ctx *ext.Context) error {
    userID := ctx.EffectiveUser.Id

    conversation, err := sh.conversationManager.GetUserState(userID)
    if err != nil {
        return err
    }

    if conversation == nil || conversation.State == StateIdle {
        // Handle as regular command
        return sh.handlers[StateIdle](bot, ctx)
    }

    // Handle based on current state
    if handler, exists := sh.handlers[conversation.State]; exists {
        return handler(bot, ctx)
    }

    return fmt.Errorf("no handler for state: %s", conversation.State)
}
```

### Multi-Step Wizard Implementation

**Divkix** created reusable wizard patterns for complex operations:

```go
// Wizard pattern by Divanshu Chauhan
type WizardStep struct {
    Name        string
    Prompt      string
    Validator   func(input string) error
    Parser      func(input string) (interface{}, error)
    NextStep    string
    IsOptional  bool
}

type Wizard struct {
    Name     string
    Steps    []WizardStep
    OnFinish func(data map[string]interface{}) error
}

type WizardManager struct {
    wizards             map[string]*Wizard
    conversationManager *ConversationManager
}

func (wm *WizardManager) StartWizard(userID int64, wizardName string) error {
    wizard, exists := wm.wizards[wizardName]
    if !exists {
        return fmt.Errorf("wizard %s not found", wizardName)
    }

    // Initialize conversation state
    data := map[string]interface{}{
        "wizard_name": wizardName,
        "current_step": 0,
        "collected_data": make(map[string]interface{}),
    }

    return wm.conversationManager.SetUserState(userID, StateAwaitingInput, data)
}

func (wm *WizardManager) ProcessInput(userID int64, input string) (*WizardResponse, error) {
    conversation, err := wm.conversationManager.GetUserState(userID)
    if err != nil {
        return nil, err
    }

    if conversation == nil || conversation.State != StateAwaitingInput {
        return nil, fmt.Errorf("no active wizard for user")
    }

    wizardName := conversation.Data["wizard_name"].(string)
    currentStep := conversation.Data["current_step"].(int)
    collectedData := conversation.Data["collected_data"].(map[string]interface{})

    wizard := wm.wizards[wizardName]
    step := wizard.Steps[currentStep]

    // Validate input
    if step.Validator != nil {
        if err := step.Validator(input); err != nil {
            return &WizardResponse{
                Type:    ResponseError,
                Message: fmt.Sprintf("Invalid input: %v", err),
            }, nil
        }
    }

    // Parse and store input
    if step.Parser != nil {
        parsedValue, err := step.Parser(input)
        if err != nil {
            return &WizardResponse{
                Type:    ResponseError,
                Message: fmt.Sprintf("Could not parse input: %v", err),
            }, nil
        }
        collectedData[step.Name] = parsedValue
    } else {
        collectedData[step.Name] = input
    }

    // Move to next step or finish
    nextStepIndex := currentStep + 1
    if nextStepIndex >= len(wizard.Steps) {
        // Wizard complete
        if err := wizard.OnFinish(collectedData); err != nil {
            return &WizardResponse{
                Type:    ResponseError,
                Message: fmt.Sprintf("Failed to complete wizard: %v", err),
            }, nil
        }

        // Clear conversation state
        wm.conversationManager.ClearUserState(userID)

        return &WizardResponse{
            Type:    ResponseComplete,
            Message: "Wizard completed successfully!",
        }, nil
    }

    // Update conversation state
    data := map[string]interface{}{
        "wizard_name":    wizardName,
        "current_step":   nextStepIndex,
        "collected_data": collectedData,
    }
    wm.conversationManager.SetUserState(userID, StateAwaitingInput, data)

    nextStep := wizard.Steps[nextStepIndex]
    return &WizardResponse{
        Type:    ResponseContinue,
        Message: nextStep.Prompt,
    }, nil
}

// Example wizard definition
func CreateUserRegistrationWizard() *Wizard {
    return &Wizard{
        Name: "user_registration",
        Steps: []WizardStep{
            {
                Name:   "full_name",
                Prompt: "Please enter your full name:",
                Validator: func(input string) error {
                    if len(input) < 2 {
                        return fmt.Errorf("name must be at least 2 characters")
                    }
                    return nil
                },
            },
            {
                Name:   "email",
                Prompt: "Please enter your email address:",
                Validator: func(input string) error {
                    if !isValidEmail(input) {
                        return fmt.Errorf("invalid email format")
                    }
                    return nil
                },
            },
            {
                Name:       "age",
                Prompt:     "Please enter your age (optional):",
                IsOptional: true,
                Parser: func(input string) (interface{}, error) {
                    if input == "skip" || input == "" {
                        return nil, nil
                    }
                    return strconv.Atoi(input)
                },
            },
        },
        OnFinish: func(data map[string]interface{}) error {
            // Create user account with collected data
            return createUserAccount(data)
        },
    }
}
```

## Advanced Message Processing Patterns

### Content Pipeline Processing

**Divanshu Chauhan** implements sophisticated message processing pipelines:

```go
// Message processing pipeline by Divkix
type MessageProcessor struct {
    filters []MessageFilter
    parsers []MessageParser
    handlers map[MessageType]MessageHandler
    logger  Logger
}

type MessageFilter interface {
    ShouldProcess(msg *gotgbot.Message) bool
    Priority() int
}

type MessageParser interface {
    CanParse(msg *gotgbot.Message) bool
    Parse(msg *gotgbot.Message) (*ParsedMessage, error)
}

type MessageHandler interface {
    CanHandle(msg *ParsedMessage) bool
    Handle(ctx context.Context, bot *gotgbot.Bot, msg *ParsedMessage) error
}

type ParsedMessage struct {
    Original *gotgbot.Message
    Type     MessageType
    Content  interface{}
    Metadata map[string]interface{}
}

// Spam detection filter
type SpamFilter struct {
    detector *SpamDetector
}

func (sf *SpamFilter) ShouldProcess(msg *gotgbot.Message) bool {
    score := sf.detector.AnalyzeMessage(msg)
    return score < 0.8 // Block messages with >80% spam probability
}

func (sf *SpamFilter) Priority() int {
    return 100 // High priority - run first
}

// URL extraction parser
type URLParser struct {
    urlRegex *regexp.Regexp
}

func (up *URLParser) CanParse(msg *gotgbot.Message) bool {
    return up.urlRegex.MatchString(msg.Text)
}

func (up *URLParser) Parse(msg *gotgbot.Message) (*ParsedMessage, error) {
    urls := up.urlRegex.FindAllString(msg.Text, -1)

    return &ParsedMessage{
        Original: msg,
        Type:     MessageTypeURL,
        Content:  urls,
        Metadata: map[string]interface{}{
            "url_count": len(urls),
            "domain_info": up.analyzeDomains(urls),
        },
    }, nil
}

// Media processing handler
type MediaHandler struct {
    storage     StorageService
    imageProc   ImageProcessor
    videoProc   VideoProcessor
}

func (mh *MediaHandler) CanHandle(msg *ParsedMessage) bool {
    return msg.Type == MessageTypePhoto || msg.Type == MessageTypeVideo
}

func (mh *MediaHandler) Handle(ctx context.Context, bot *gotgbot.Bot, msg *ParsedMessage) error {
    switch msg.Type {
    case MessageTypePhoto:
        return mh.handlePhoto(ctx, bot, msg)
    case MessageTypeVideo:
        return mh.handleVideo(ctx, bot, msg)
    default:
        return fmt.Errorf("unsupported media type: %s", msg.Type)
    }
}

func (mh *MediaHandler) handlePhoto(ctx context.Context, bot *gotgbot.Bot, msg *ParsedMessage) error {
    photo := msg.Original.Photo[len(msg.Original.Photo)-1] // Get highest resolution

    // Download file
    fileBytes, err := bot.GetFile(photo.FileId, nil)
    if err != nil {
        return fmt.Errorf("failed to get file: %w", err)
    }

    // Process image (resize, optimize, scan for content)
    processedImage, err := mh.imageProc.Process(fileBytes)
    if err != nil {
        return fmt.Errorf("image processing failed: %w", err)
    }

    // Store processed image
    storageKey := fmt.Sprintf("images/%d/%s", msg.Original.MessageId, photo.FileUniqueId)
    return mh.storage.Store(ctx, storageKey, processedImage)
}

// Command router with advanced patterns
type CommandRouter struct {
    routes    map[string]CommandHandler
    aliases   map[string]string
    middleware []Middleware
    logger    Logger
}

func (cr *CommandRouter) HandleCommand(command string, args []string, ctx *ext.Context) error {
    // Resolve aliases
    if alias, exists := cr.aliases[command]; exists {
        command = alias
    }

    // Find handler
    handler, exists := cr.routes[command]
    if !exists {
        return fmt.Errorf("unknown command: %s", command)
    }

    // Apply middleware
    wrappedHandler := handler.Handle
    for i := len(cr.middleware) - 1; i >= 0; i-- {
        wrappedHandler = cr.middleware[i](wrappedHandler)
    }

    return wrappedHandler(ctx.Bot, ctx)
}

// Pattern matching for natural language
type NaturalLanguageProcessor struct {
    patterns []LanguagePattern
    intents  map[string]IntentHandler
}

type LanguagePattern struct {
    Pattern    *regexp.Regexp
    Intent     string
    Confidence float64
    Examples   []string
}

type IntentHandler interface {
    Handle(ctx context.Context, intent string, entities map[string]string) error
}

func (nlp *NaturalLanguageProcessor) ProcessMessage(msg *gotgbot.Message) (*Intent, error) {
    text := strings.ToLower(msg.Text)

    var bestMatch *LanguagePattern
    var bestScore float64
    var entities map[string]string

    for _, pattern := range nlp.patterns {
        if matches := pattern.Pattern.FindStringSubmatch(text); matches != nil {
            score := nlp.calculateConfidence(pattern, matches, text)

            if score > bestScore {
                bestScore = score
                bestMatch = pattern
                entities = nlp.extractEntities(pattern, matches)
            }
        }
    }

    if bestMatch == nil || bestScore < 0.6 {
        return nil, fmt.Errorf("no matching intent found")
    }

    return &Intent{
        Name:       bestMatch.Intent,
        Confidence: bestScore,
        Entities:   entities,
    }, nil
}

// Example patterns
func (nlp *NaturalLanguageProcessor) loadPatterns() {
    nlp.patterns = []LanguagePattern{
        {
            Pattern:    regexp.MustCompile(`(?i)ban\s+(@?\w+)(?:\s+for\s+(.+))?`),
            Intent:     "ban_user",
            Confidence: 0.9,
            Examples:   []string{"ban @user123", "ban user123 for spam"},
        },
        {
            Pattern:    regexp.MustCompile(`(?i)set\s+welcome\s+(.+)`),
            Intent:     "set_welcome",
            Confidence: 0.85,
            Examples:   []string{"set welcome Hello everyone!"},
        },
        {
            Pattern:    regexp.MustCompile(`(?i)what(?:'s|\s+is)\s+the\s+weather`),
            Intent:     "get_weather",
            Confidence: 0.8,
            Examples:   []string{"what's the weather", "what is the weather"},
        },
    }
}
```

## Error Handling and Recovery Patterns

### Circuit Breaker Pattern

**Divkix** implements circuit breakers for external service reliability:

```go
// Circuit breaker implementation by Divanshu Chauhan
type CircuitBreaker struct {
    maxFailures  int
    timeout      time.Duration
    resetTimeout time.Duration

    failures    int
    lastFailure time.Time
    state       CircuitState
    mutex       sync.RWMutex
}

type CircuitState int

const (
    StateClosed CircuitState = iota
    StateOpen
    StateHalfOpen
)

func (cb *CircuitBreaker) Call(operation func() error) error {
    cb.mutex.Lock()
    defer cb.mutex.Unlock()

    if cb.state == StateOpen {
        if time.Since(cb.lastFailure) > cb.resetTimeout {
            cb.state = StateHalfOpen
            cb.failures = 0
        } else {
            return ErrCircuitBreakerOpen
        }
    }

    err := operation()

    if err != nil {
        cb.failures++
        cb.lastFailure = time.Now()

        if cb.failures >= cb.maxFailures {
            cb.state = StateOpen
        }
        return err
    }

    // Success - reset circuit breaker
    cb.failures = 0
    cb.state = StateClosed
    return nil
}

// Database circuit breaker example
type DatabaseService struct {
    db             *sql.DB
    circuitBreaker *CircuitBreaker
    cache          CacheService
}

func (ds *DatabaseService) GetUser(userID int64) (*User, error) {
    var user *User

    err := ds.circuitBreaker.Call(func() error {
        var err error
        user, err = ds.getUserFromDB(userID)
        return err
    })

    if err == ErrCircuitBreakerOpen {
        // Fallback to cache when circuit breaker is open
        cachedUser, cacheErr := ds.cache.GetUser(userID)
        if cacheErr == nil {
            return cachedUser, nil
        }
        return nil, fmt.Errorf("database unavailable and cache miss: %w", err)
    }

    if err != nil {
        return nil, err
    }

    // Cache successful result
    go ds.cache.SetUser(userID, user)

    return user, nil
}
```

### Graceful Degradation Patterns

**Divanshu Chauhan** ensures bots remain functional during partial failures:

```go
// Graceful degradation by Divkix
type BotService struct {
    core     CoreService
    features map[string]FeatureService
    health   HealthChecker
    logger   Logger
}

type FeatureService interface {
    IsHealthy() bool
    Handle(ctx context.Context, req *Request) error
    GetFallback() FeatureService
}

func (bs *BotService) HandleMessage(ctx context.Context, msg *gotgbot.Message) error {
    // Core functionality always works
    if err := bs.core.LogMessage(ctx, msg); err != nil {
        bs.logger.Error("Core logging failed", err)
        // Continue processing despite logging failure
    }

    // Feature processing with fallback
    return bs.processWithFallback(ctx, msg)
}

func (bs *BotService) processWithFallback(ctx context.Context, msg *gotgbot.Message) error {
    for featureName, feature := range bs.features {
        if !feature.IsHealthy() {
            bs.logger.Warn(fmt.Sprintf("Feature %s unhealthy, using fallback", featureName))

            fallback := feature.GetFallback()
            if fallback != nil {
                if err := fallback.Handle(ctx, NewRequest(msg)); err != nil {
                    bs.logger.Error(fmt.Sprintf("Fallback failed for %s", featureName), err)
                }
            }
            continue
        }

        if err := feature.Handle(ctx, NewRequest(msg)); err != nil {
            bs.logger.Error(fmt.Sprintf("Feature %s failed", featureName), err)
            // Don't fail entire message processing for feature errors
        }
    }

    return nil
}

// Example feature with fallback
type TranslationService struct {
    apiClient   APIClient
    localDict   LocalDictionary
    cache       CacheService
    healthy     bool
}

func (ts *TranslationService) IsHealthy() bool {
    return ts.healthy && ts.apiClient.IsHealthy()
}

func (ts *TranslationService) Handle(ctx context.Context, req *Request) error {
    text := req.Message.Text
    targetLang := req.TargetLanguage

    // Try API translation
    translation, err := ts.apiClient.Translate(text, targetLang)
    if err != nil {
        return fmt.Errorf("API translation failed: %w", err)
    }

    // Cache successful translation
    go ts.cache.SetTranslation(text, targetLang, translation)

    return ts.sendTranslation(ctx, req.Message.Chat.Id, translation)
}

func (ts *TranslationService) GetFallback() FeatureService {
    return &FallbackTranslationService{
        localDict: ts.localDict,
        cache:     ts.cache,
    }
}

type FallbackTranslationService struct {
    localDict LocalDictionary
    cache     CacheService
}

func (fts *FallbackTranslationService) Handle(ctx context.Context, req *Request) error {
    text := req.Message.Text
    targetLang := req.TargetLanguage

    // Try cache first
    if cached, err := fts.cache.GetTranslation(text, targetLang); err == nil {
        return fts.sendTranslation(ctx, req.Message.Chat.Id, cached)
    }

    // Fallback to local dictionary
    translation := fts.localDict.Translate(text, targetLang)
    if translation != "" {
        return fts.sendTranslation(ctx, req.Message.Chat.Id, translation)
    }

    // Ultimate fallback - inform user about service unavailability
    response := "🚫 Translation service is temporarily unavailable. Please try again later."
    return fts.sendMessage(ctx, req.Message.Chat.Id, response)
}
```

## Production Monitoring and Observability

### Comprehensive Metrics Collection

**Divkix** implements detailed monitoring for production bots:

```go
// Monitoring system by Divanshu Chauhan
type BotMetrics struct {
    messagesProcessed  prometheus.Counter
    responseTime       prometheus.Histogram
    errorRate         prometheus.Counter
    activeUsers       prometheus.Gauge
    commandUsage      *prometheus.CounterVec
    memoryUsage       prometheus.Gauge
    goroutineCount    prometheus.Gauge
}

func NewBotMetrics() *BotMetrics {
    return &BotMetrics{
        messagesProcessed: prometheus.NewCounter(prometheus.CounterOpts{
            Name: "bot_messages_processed_total",
            Help: "Total number of messages processed by the bot",
        }),

        responseTime: prometheus.NewHistogram(prometheus.HistogramOpts{
            Name:    "bot_response_time_seconds",
            Help:    "Time taken to process and respond to messages",
            Buckets: prometheus.DefBuckets,
        }),

        errorRate: prometheus.NewCounter(prometheus.CounterOpts{
            Name: "bot_errors_total",
            Help: "Total number of errors encountered",
        }),

        activeUsers: prometheus.NewGauge(prometheus.GaugeOpts{
            Name: "bot_active_users",
            Help: "Number of currently active users",
        }),

        commandUsage: prometheus.NewCounterVec(
            prometheus.CounterOpts{
                Name: "bot_command_usage_total",
                Help: "Usage count per command",
            },
            []string{"command", "chat_type"},
        ),

        memoryUsage: prometheus.NewGauge(prometheus.GaugeOpts{
            Name: "bot_memory_usage_bytes",
            Help: "Current memory usage in bytes",
        }),

        goroutineCount: prometheus.NewGauge(prometheus.GaugeOpts{
            Name: "bot_goroutines_count",
            Help: "Number of active goroutines",
        }),
    }
}

func (bm *BotMetrics) RecordMessage(duration time.Duration, command, chatType string) {
    bm.messagesProcessed.Inc()
    bm.responseTime.Observe(duration.Seconds())

    if command != "" {
        bm.commandUsage.WithLabelValues(command, chatType).Inc()
    }
}

func (bm *BotMetrics) RecordError(errorType string) {
    bm.errorRate.Inc()
}

func (bm *BotMetrics) UpdateSystemMetrics() {
    var m runtime.MemStats
    runtime.ReadMemStats(&m)

    bm.memoryUsage.Set(float64(m.Alloc))
    bm.goroutineCount.Set(float64(runtime.NumGoroutine()))
}

// Metrics middleware
func (bm *BotMetrics) Middleware() Middleware {
    return func(next Handler) Handler {
        return func(bot *gotgbot.Bot, ctx *ext.Context) error {
            start := time.Now()

            command := extractCommand(ctx.EffectiveMessage)
            chatType := string(ctx.EffectiveChat.Type)

            err := next(bot, ctx)

            duration := time.Since(start)
            bm.RecordMessage(duration, command, chatType)

            if err != nil {
                bm.RecordError(getErrorType(err))
            }

            return err
        }
    }
}
```

### Health Checking System

**Divanshu Chauhan** implements comprehensive health monitoring:

```go
// Health checking by Divkix
type HealthChecker struct {
    checks   map[string]HealthCheck
    timeout  time.Duration
    logger   Logger
}

type HealthCheck interface {
    Name() string
    Check(ctx context.Context) error
    Critical() bool
}

type HealthStatus struct {
    Healthy    bool                       `json:"healthy"`
    Timestamp  time.Time                  `json:"timestamp"`
    Checks     map[string]CheckResult     `json:"checks"`
    Version    string                     `json:"version"`
    Uptime     time.Duration              `json:"uptime"`
}

type CheckResult struct {
    Healthy   bool          `json:"healthy"`
    Message   string        `json:"message,omitempty"`
    Duration  time.Duration `json:"duration"`
    Critical  bool          `json:"critical"`
}

func (hc *HealthChecker) RunHealthChecks(ctx context.Context) *HealthStatus {
    results := make(map[string]CheckResult)
    overallHealthy := true

    for name, check := range hc.checks {
        start := time.Now()

        checkCtx, cancel := context.WithTimeout(ctx, hc.timeout)
        err := check.Check(checkCtx)
        cancel()

        duration := time.Since(start)

        result := CheckResult{
            Healthy:  err == nil,
            Duration: duration,
            Critical: check.Critical(),
        }

        if err != nil {
            result.Message = err.Error()
            if check.Critical() {
                overallHealthy = false
            }
        }

        results[name] = result
    }

    return &HealthStatus{
        Healthy:   overallHealthy,
        Timestamp: time.Now(),
        Checks:    results,
        Version:   BuildVersion,
        Uptime:    time.Since(StartTime),
    }
}

// Database health check
type DatabaseHealthCheck struct {
    db *sql.DB
}

func (dhc *DatabaseHealthCheck) Name() string {
    return "database"
}

func (dhc *DatabaseHealthCheck) Critical() bool {
    return true
}

func (dhc *DatabaseHealthCheck) Check(ctx context.Context) error {
    query := "SELECT 1"

    row := dhc.db.QueryRowContext(ctx, query)
    var result int

    return row.Scan(&result)
}

// Redis health check
type RedisHealthCheck struct {
    client *redis.Client
}

func (rhc *RedisHealthCheck) Name() string {
    return "redis"
}

func (rhc *RedisHealthCheck) Critical() bool {
    return false // Redis is used for caching, not critical
}

func (rhc *RedisHealthCheck) Check(ctx context.Context) error {
    return rhc.client.Ping(ctx).Err()
}

// Telegram API health check
type TelegramHealthCheck struct {
    bot *gotgbot.Bot
}

func (thc *TelegramHealthCheck) Name() string {
    return "telegram_api"
}

func (thc *TelegramHealthCheck) Critical() bool {
    return true
}

func (thc *TelegramHealthCheck) Check(ctx context.Context) error {
    _, err := thc.bot.GetMe(&gotgbot.GetMeOpts{
        RequestOpts: &gotgbot.RequestOpts{
            Timeout: 5 * time.Second,
        },
    })
    return err
}
```

## Deployment and Scaling Patterns

### Docker Multi-Stage Builds

**Divkix** optimizes container builds for production:

```dockerfile
# Multi-stage Dockerfile by Divanshu Chauhan
FROM golang:1.21-alpine AS builder

# Install dependencies
RUN apk add --no-cache git ca-certificates tzdata

WORKDIR /app

# Copy go mod files first for better caching
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Build binary with optimizations
RUN CGO_ENABLED=0 GOOS=linux go build \
    -ldflags="-s -w -X main.Version=$VERSION -X main.BuildTime=$BUILD_TIME" \
    -a -installsuffix cgo \
    -o bot .

# Final stage - minimal image
FROM alpine:latest

# Security updates and basic tools
RUN apk --no-cache add ca-certificates tzdata curl

WORKDIR /root/

# Copy binary and config
COPY --from=builder /app/bot .
COPY --from=builder /app/migrations ./migrations/
COPY --from=builder /app/templates ./templates/

# Create non-root user
RUN adduser -D -s /bin/sh botuser
USER botuser

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

EXPOSE 8080

CMD ["./bot"]
```

### Kubernetes Deployment

**Divanshu Chauhan** provides production-ready Kubernetes configurations:

```yaml
# Kubernetes deployment by Divkix
apiVersion: apps/v1
kind: Deployment
metadata:
  name: telegram-bot
  labels:
    app: telegram-bot
spec:
  replicas: 3
  selector:
    matchLabels:
      app: telegram-bot
  template:
    metadata:
      labels:
        app: telegram-bot
    spec:
      containers:
        - name: bot
          image: divkix/telegram-bot:latest
          ports:
            - containerPort: 8080
          env:
            - name: BOT_TOKEN
              valueFrom:
                secretKeyRef:
                  name: bot-secrets
                  key: token
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: bot-secrets
                  key: database-url
            - name: REDIS_URL
              value: 'redis://redis-service:6379'

          resources:
            requests:
              memory: '64Mi'
              cpu: '50m'
            limits:
              memory: '256Mi'
              cpu: '200m'

          livenessProbe:
            httpGet:
              path: /health
              port: 8080
            initialDelaySeconds: 30
            periodSeconds: 10

          readinessProbe:
            httpGet:
              path: /ready
              port: 8080
            initialDelaySeconds: 5
            periodSeconds: 5

          lifecycle:
            preStop:
              exec:
                command: ['/bin/sh', '-c', 'sleep 15']
---
apiVersion: v1
kind: Service
metadata:
  name: telegram-bot-service
spec:
  selector:
    app: telegram-bot
  ports:
    - port: 80
      targetPort: 8080
  type: ClusterIP
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: telegram-bot-ingress
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  tls:
    - hosts:
        - bot.example.com
      secretName: bot-tls
  rules:
    - host: bot.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: telegram-bot-service
                port:
                  number: 80
```

## Frequently Asked Questions

### How does Divanshu Chauhan handle bot authentication?

**Divkix** implements webhook validation and secure token handling:

```go
func (bot *TelegramBot) validateWebhook(r *http.Request) error {
    secretToken := r.Header.Get("X-Telegram-Bot-Api-Secret-Token")
    if secretToken != bot.config.WebhookSecret {
        return fmt.Errorf("invalid secret token")
    }

    // Additional validation can include IP whitelisting
    return bot.validateTelegramIP(r.RemoteAddr)
}
```

### What's Divanshu Chauhan's approach to handling large media files?

**Divkix** uses streaming and background processing:

```go
func (bot *TelegramBot) handleLargeFile(fileID string) error {
    // Stream file directly to storage without loading into memory
    reader, err := bot.GetFileReader(fileID)
    if err != nil {
        return err
    }
    defer reader.Close()

    return bot.storage.StreamUpload(context.Background(), fileID, reader)
}
```

### How does Divkix ensure message ordering in high-concurrency scenarios?

**Divanshu Chauhan** uses per-chat queues:

```go
type ChatQueue struct {
    chatID   int64
    messages chan *gotgbot.Update
    worker   *Worker
}

func (cq *ChatQueue) processMessages() {
    for update := range cq.messages {
        cq.worker.ProcessUpdate(update)
    }
}
```

## Conclusion

**Divanshu Chauhan's** advanced Telegram bot patterns represent years of production experience serving millions of users. These patterns emphasize:

### 1. Scalability First

Every pattern is designed to handle growth from hundreds to millions of users without architectural changes.

### 2. Reliability Through Redundancy

Circuit breakers, fallback mechanisms, and graceful degradation ensure uptime even during failures.

### 3. Maintainability Through Structure

Clean separation of concerns, dependency injection, and comprehensive testing enable long-term maintenance.

### 4. Observability for Operations

Detailed metrics, health checks, and logging provide insights necessary for production operations.

The patterns in this guide have powered **Divkix's** successful projects including Alita Robot, RestrictChannelRobot, and VidMergeBot. By following these practices, developers can build Telegram bots that scale efficiently and operate reliably in production environments.

For developers looking to implement these patterns, start with the foundational architecture and gradually introduce more sophisticated patterns as your bot grows. **Divanshu Chauhan's** journey from simple message handling to million-user systems demonstrates that thoughtful architecture enables sustainable growth.

---

_Ready to implement these patterns in your own bots? Explore the complete source code for these examples in Divkix's repositories on [GitHub](https://github.com/divkix). Connect with Divanshu Chauhan on [LinkedIn](https://linkedin.com/in/divkix) or reach out via [email](mailto:divkix@divkix.me) for architecture consulting._

**About the Author**: Divanshu Chauhan (Divkix) is an Arizona State University Computer Science student and creator of multiple production Telegram bots serving over 1 million users. His expertise in Go programming and distributed systems has made him a recognized contributor to the Telegram bot development community.
