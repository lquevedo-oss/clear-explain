# Why a work queue grows

A queue grows when tasks arrive faster than you complete them.

Suppose five tasks arrive in each step. You can complete three tasks per step.
Starting from an empty queue, you finish step one with two pending tasks. After
step two, four tasks are pending. After step three, six are pending.

The model is:

```text
next_queue = max(0, current_queue + arrivals - capacity)
```

Work arrives before processing. The queue cannot be negative. If you have less
work than capacity, the unused capacity does not carry into the next step.

This is an illustrative deterministic model. Arrivals and capacity stay constant,
all tasks take the same effort, and no task is discarded, rerouted, or prioritized.
Actual queues can behave differently.

## When capacity matches arrivals

The queue stays the same. An existing backlog does not disappear. With four
pending tasks, five arrivals, and capacity for five tasks, four remain pending.

## When capacity exceeds arrivals

An existing backlog shrinks until it reaches zero. Once it is empty, you only
complete the tasks available in that step.

[Explore the model in Spanish](work-queue.html) or inspect [its flowchart](work-queue.mmd).
