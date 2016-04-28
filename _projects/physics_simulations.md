---
layout: project
title: Physics Simulations
permalink: /projects/physics-simulations/
description: Physics simulations I made to learn about Lagrangian dynamics
purpose: >
    I love physics, and I wanted to learn about Lagrangian dynamics, a much
    more powerful way of modeling forces than Newton's Laws alone. I decided
    to try out what I learned using Processing.py.
status: demo
repo: physics-simulations
#Languages/libraries
languages:
    - Python
    - Processing.py
    - SymPy
concepts:
    - Langrangian Dynamics
    - Runge-Kutta Approximation Technique
    - Vectors
    - Rectangular/Polar coordinate systems
accomplishments:
    - Modeled simple springs, pendula and orbiting planets
    - Learned about symbolic computation using SymPy
    - Created a Python class for representing a generic mathematical vector
improvements:
    - Add more physic simulations!
    - Refactor the SymPy Code, there's lots of boilerplate code there
    - Refactor out a vector math library. This will be helpful in other projects.
thumbnail: "physics-simulations/spring.png"
years: 2016
draft: false
featured: true
wip: true
---

### Lagrangian Dynamics

Lagrangian Dynamics is a method of studying the motion of a system. It is
similar to Newton's Second Law (\\(F = ma\\)), but with some key differences:

* Lagrangian Dynamics looks at the kinetic/potential energy of a system whereas
  Newtonian Dynamics looks at the forces in a system.
* Lagrangian Dynamics works in any coordinate system, not just Cartesian
  coordinates. For example, a pendulum's position is more easily expressed
  as an angle than an (x, y) position.

What is a Lagrangian? It is a value that describes the energy of the system.

If T is the total kinetic energy of the system and V is the total potential
energy, the Lagrangian L is:

$$ L = T - V $$

Units: \\(kg * m^2/s^2 = J = N * m\\), in other words, units of energy!

Unfortunately, there's no intuitive meaning to the Lagrangian. Just think of
it as a mathematical object that contains info about the energy of the system.

#### Coordinate Systems

Now to use the Lagrangian, we must pick a coordinate system for denoting
position of parts of the system. Some examples:

| Variables       | Coordinate system | Units  |
|-----------------|-------------------|--------|
| $$ x, y $$      | Cartesian         | m, m   |
| $$ r, \theta $$ | Polar             | m, rad |
| $$ q_1, q_2 $$  | Generalized       | ?, ?   |
{:.table .table-striped}

That 'q's in the last row are simply placeholder variables for any arbitrary
coordinate system. For example, in rectangular coordinates:

$$ q_1 = x $$

$$ q_2 = y $$

whereas in polar coordinates:

$$ q_1 = r $$

$$ q_2 = \theta $$

Also, when \\(q_i\\) appears in equations below, it just means that the
equation applies for any of the coordinates.

#### The Equation

The Euler-Lagrange equation, is the equation that governs Lagrangian
dynamics. Here it is:

$$ \frac{d}{dt}\frac{\partial L}{\partial \dot q_i}  = \frac{\partial L}{\partial q_i}$$

Looks messy, doesn't it? Not to worry, we can break this down into smaller parts.
Most of the time, the left hand side of the equation deals with the kinetic
energy term, while the right hand side deals with potential energy.

#### Right Hand Side

Let's start with the right hand side's units using an (x, y) coordinate system:

$$ \frac{\partial L}{\partial q_i} = \left[\frac{Energy}{Position}\right] = [Force] $$

We take the derivative of the energy of the system (L) with respect to one of
the coordinates. Often, only the potential energy terms depend on position, so
this derivative is often the same as

$$\frac{\partial V}{\partial q_i}$$

For example, take a system with spring potential energy:

$$ T = \frac{1}{2} m v^2  $$

$$ V = \frac{1}{2} k x^2$$

$$ \frac{\partial V}{\partial x} = kx $$

and since kinetic energy does not depend on position (only velocity), we have:

$$ \frac{\partial L}{\partial x} = 0 - \frac{\partial V}{\partial x} = -kx $$

Look familiar? \\(-kx\\) is simply the spring force! Often familiar forces
will appear on the right hand side of the equation after taking the derivative.

#### Left Hand Side

First, take the derivative of the Lagrangian with respect to the velocity.
Here is the dimensional analysis:

$$ \frac{\partial L}{\partial \dot q_i} = \left[\frac{Energy}{Velocity}\right] = [Momentum] $$

For an example, take the spring example.

$$ T = \frac{1}{2} m v^2  $$

$$ V = \frac{1}{2} k x^2$$

$$ \frac{\partial L}{\partial v} = \frac{\partial T}{\partial x} - 0 = mv $$

We get the usual formula for momentum!

Now we simply take this quantity and take the time derivative:

$$ \frac{d}{dt}\frac{\partial L}{\partial v} = \frac{d}{dt}(mv) = ma $$

Mass times acceleration... where have we seen this before? Newton's Second law!

#### All Together Now

In the spring example, we went from here:

$$ \frac{d}{dt}\frac{\partial L}{\partial \dot q_i}  = \frac{\partial L}{\partial q_i}$$

to here:

$$ ma = -kx $$

Which is exactly the same as if you started with

$$ ma = \sum F $$

So why the trouble of doing these derivatives when regular force analysis works
fine? The main reason is that Lagrangian dynamics works in any coordinate
system, which makes it more flexible than Newtonian force analysis which is
easiest in Cartesian coordinates.

For example, it is easier to represent the equation for a Pendulum using
angle instead of x- and y-position.

In some of the sections below, I give examples of the equations used in each
simulation, along with the coordinate system that is most useful.

One thing to note: when making physics simulations, the acceleration is the
quantity we want, for then we can approximate velocity and position over time.

So for the above example, we would solve for the acceleration:

$$ a = \frac{-kx}{m} $$

### Vectors

Vectors are mathematical objects that contain several components. They can
be added together, scaled by a constant, etc.

### Runge-Kutta Approximation

Runge-Kutta is a method of approximating the integral of a function numerically.
It is similar in principle to Euler's Method, though it uses a weighted average
of derivative values to improve accuracy at the cost of extra calculations.

[See here](http://www.myphysicslab.com/runge_kutta.html) for a site that explains
the equations, since this page is already large as it is.

In physics simulations, you do the Runge-Kutta algorithm twice at each time
step. One approximates the velocity given the acceleration, and the other
calculates position from velocity.

We do this at every frame of the animation. This allows us to plot the path
of various objects, even when a position function cannot be directly derived.
This is especially the case for  chaotic systems like the double pendulum or
double spring.

### Simulations

Here are the simulations included so far in the project along with a quick
summary of the equations behind them.

Note that each simulation has a plot of phase space, i.e. a graph of velocity
vs. position that represents all the states of the system. Notice how the simple
systems (Single Spring/Pendulum) have simple phase plots, while chaotic systems
(Double Spring/Pendulum) have very convoluted paths through phase space.

#### Single Pendulum

{% include youtube.html vid_id="VkSH4OA2_W8" %}

<!-- TODO: SVG Diagram -->

**Variables**:

| Variable   | Units | Description |
|------------|-------|-------------|
| $$m$$      | kg    | mass of the bob. Constant. |
| $$l$$      | m     | Length of the pendulum |
| $$g$$      | m/s^2 | Acceleration due to gravity |
| $$\theta$$ | rad   | Angle of the pendulum from vertical |
| $$\dot \theta$$ | rad/s   | Angular velocity of the pendulum |
| $$\ddot \theta$$| rad/s^2 | Angular acceleration of the pendulum |
{: .table .table-striped}

**Equations**:

| Quantity             | Equation |
|----------------------|----------|
| Kinetic Energy       | $$T = \frac{1}{2}ml^2\dot\theta^2 $$ |
| Potential Energy     | $$V = -mg\cos \theta $$ |
| Equations for Motion | $$\dot \theta = -\frac{g}{l} \sin\theta$$ |
{: .table .table-striped}

#### Double Pendulum

<!-- TODO: SVG Diagram -->

{% include youtube.html vid_id="3VqbW6H_ets" %}

...

#### Single Spring

<!-- TODO: SVG Diagram -->

This simulation is of an ideal, massless spring fixed at one end
with a bob on the other end. The system oscillates horizontally on a
frictionless surface.

{% include youtube.html vid_id="fngVyTJc-Lc" %}

**Variables**:

| Variable   | Units | Description |
|------------|-------|-------------|
| $$m$$      | kg    | mass of the bob. Constant. |
| $$k$$      | N/m   | Spring constant. |
| $$x$$      | m     | stretch of the spring *from the equilbrium position*|
| $$\dot x$$ | m/s   | horizontal velocity |
| $$\ddot x$$| m/s^2 | horizontal acceleration |
{: .table .table-striped}

**Equations**:

| Quantity             | Equation |
|----------------------|----------|
| Kinetic Energy       | $$T = \frac{1}{2}m\dot{x}^2 $$ |
| Potential Energy     | $$V = \frac{1}{2}k{x}^2 $$ |
| Equations for Motion | $$\ddot x = -\frac{kx}{m} $$ |
{: .table .table-striped}

#### Double Spring

<!-- TODO: SVG Diagram -->

{% include youtube.html vid_id="GoOVCgcw65M" %}

**Variables**:

| Variable     | Units | Description |
|--------------|-------|-------------|
| $$m_i$$      | kg    | mass of bob number i. Constant. |
| $$k_i$$      | N/m   | Spring constant for spring number i. |
| $$x_i$$      | m     | stretch of the i-th spring *from the equilbrium position*|
| $$\dot x_i$$ | m/s   | horizontal velocity of bob number i |
| $$\ddot x_i$$| m/s^2 | horizontal acceleration of bob number i |
{: .table .table-striped}

Note: bob 2's position, \\(x_2\\) is measured from equilibrium. this is
NOT the stretch of spring 2.

**Equations**:

| Quantity             | Equation |
|----------------------|----------|
| Kinetic Energy       | $$T = \frac{1}{2}m_1 \dot{x_1}^2 + \frac{1}{2}m_2 \dot{x_2}^2$$ |
| Potential Energy     | $$V = \frac{1}{2}k_1 x_1^2 + \frac{1}{2}k_2(x_2 - x_1)^2 $$ |
| Equations for Motion | $$\ddot x_1 = \frac{1}{m}(-k_1x_1 - k_2x_1 + k_2x_2)$$ |
|                      | $$\ddot x_2 = \frac{k_2}{m_2}(x_1 - x_2) $$ |
{: .table .table-striped}

Note: For potential energy, we need the stretch of each spring. for spring 1,
this is the same as its displacement from equilibrium. However, for spring 2,
we have to subtract the stretch of spring 1, else the value will be the
stretch + how much spring 2 translates to the right due to spring 1's stretch.

#### Orbiting Planets

<!-- TODO: SVG Diagram -->

{% include youtube.html vid_id="rXlmvBBRu8E" %}

**Variables**:

| Variable     | Units | Description |
|--------------|-------|-------------|
| $$m$$        | kg    | mass of satellite |
| $$M$$        | kg    | mass of planet |
| $$G$$        | ...   | Gravitational Constant |
| $$r$$        | m     | distance of satellite from center of the planet |
| $$\dot r$$   | m/s   | radial velocity of satellite |
| $$\ddot r$$  | m/s^2 | radial acceleration of satellite |
| $$\theta$$   | rad   | angle of satellite around the planet |
| $$\dot \theta$$  | rad/s   | angular velocity of satellite |
| $$\ddot \theta$$ | rad/s^2 | angle of satellite around the planet |
{: .table .table-striped}

**Equations**:

...
