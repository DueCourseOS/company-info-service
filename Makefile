IMAGE="company/company-info-service"
VOLUMES=-v $(CURDIR)/src:/opt/app/src \
	-v $(CURDIR)/test:/opt/app/test
RUN=docker run -it --rm $(VOLUMES) $(IMAGE)

.PHONY: build rebuild rmi lint test

build:
	@docker build -t $(IMAGE) .

rebuild:
	@docker build --no-cache -t $(IMAGE) .

rmi:
	@docker rmi $(IMAGE)

lint:
	@$(RUN) yarn run lint

test:
	@$(RUN) yarn run test
