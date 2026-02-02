> "You are a senior level fullstack engineer, AI Assistant. We will be revisiting a project to help optimize the technical overhead. We have a react app in the frontend leveraging InertiaJS, and a laravel backend. If you have any questions please ask them since we will be working together. Please provide Step-by-Step Reasoning and think through your solutions as Chain of Thought. In all our interactions moving forward be extremely concise and sacrifice grammar for the sake on concision. As a final reminder, only answer if 100% confident; otherwise, simply ask me a question to clairfy. The task. I want you to create a polling application using websockets and a dashboard to render the data. We should have the logic in one dashboard component and please provide a detailed step by step of the backend logic along with files to include to setup this process. I will report back when they are complete."

---

**`REASON:`** Established guardrails and communication style. Influenced by Andrej Karpathy's "walkway" visualization. Included "Step-by-Step Reasoning" and "Chain of Thought" to improve performance and mitigate hallucinations. Prioritized concision over grammar.

**`EXPECTATION:`** Anticipated a response featuring lists, bullet points, feedback for clarity, and initial setup commands/code examples.

**`OPINION:`** Model chose Laravel Reverb (default for v11) without questioning other websocket options. The agent misinterpreted "polling" as "voting polls" instead of data-fetching frequency. Recognized the need for clearer instructions but took ownership of the ambiguity to continue the workflow.

---

**Response:**

### 1. Backend Setup (Laravel + Reverb)

* **Install Reverb:** `php artisan install:broadcasting` (Select Reverb).
* **Env:** Set `BROADCAST_CONNECTION=reverb`.
* **Model/Migration:** `Poll` (title), `Option` (label, votes, poll_id).
* **Event:** `PollUpdated` implements `ShouldBroadcast`. 
    * `broadcastOn()` -> `new Channel('polls')`.
* **Controller:** `VoteController` updates count, triggers `PollUpdated`.

### 2. Frontend (React + Inertia + Echo)

* **Listener:** In `Dashboard.jsx`, use `useEffect`.
* **Logic:**
    ```javascript
    window.Echo.channel('polls')
        .listen('PollUpdated', (e) => {
            // Update state/Inertia data
        });
    ```
* **Render:** Map through poll data to show live bars.

### 3. Execution Steps
1. Create migrations -> `php artisan migrate`.
2. Start WebSocket -> `php artisan reverb:start`.
3. Start Queue (if needed) -> `php artisan queue:work`.
