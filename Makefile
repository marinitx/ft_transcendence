# Variables
TS_SRC = ./src
TS_OUT = ./dist
TAILWIND_INPUT = ./src/input.css
TAILWIND_OUTPUT = ./src/output.css

# Comandos
TS_WATCH = npx tsc -w
TAILWIND_WATCH = npx @tailwindcss/cli -i $(TAILWIND_INPUT) -o $(TAILWIND_OUTPUT) --watch
LIVE_SERVER = npx live-server

# Targets
.PHONY: all ts css serve start clean

all: start

ts:
	@echo "🔹 Iniciando TypeScript watch..."
	$(TS_WATCH)

css:
	@echo "🔹 Iniciando Tailwind watch..."
	$(TAILWIND_WATCH)

serve:
	@echo "🔹 Iniciando servidor local..."
	$(LIVE_SERVER)

start:
	@echo "🚀 Iniciando proyecto..."
	@$(MAKE) -j2 ts css

fclean:
	@echo "🧹 Limpiando archivos compilados..."
	@rm -f $(TS_OUT)/*.js $(TS_OUT)/*.js.map $(TAILWIND_OUTPUT)
